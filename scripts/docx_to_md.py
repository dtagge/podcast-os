#!/usr/bin/env python3
"""Convert a .docx file to Markdown using only the stdlib.

Handles: headings (Heading1..6, Title), paragraphs, bold/italic runs,
bulleted and numbered lists, hyperlinks, tables, and basic line breaks.

Usage:
    python3 scripts/docx_to_md.py <input.docx> <output.md>
"""

from __future__ import annotations

import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def _text_of_run(run: ET.Element) -> str:
    """Extract text from a <w:r> run, applying bold/italic markdown."""
    parts: list[str] = []
    for child in run:
        tag = child.tag
        if tag == f"{W}t":
            parts.append(child.text or "")
        elif tag == f"{W}tab":
            parts.append("\t")
        elif tag == f"{W}br":
            parts.append("  \n")
        elif tag == f"{W}noBreakHyphen":
            parts.append("-")
    text = "".join(parts)
    if not text:
        return ""

    rpr = run.find(f"{W}rPr")
    bold = italic = False
    if rpr is not None:
        if rpr.find(f"{W}b") is not None:
            bold = True
        if rpr.find(f"{W}i") is not None:
            italic = True

    if bold and italic:
        return f"***{text}***"
    if bold:
        return f"**{text}**"
    if italic:
        return f"*{text}*"
    return text


def _paragraph_text(p: ET.Element, rels: dict[str, str]) -> str:
    """Render a <w:p> paragraph to inline markdown text."""
    pieces: list[str] = []
    for child in p.iter():
        tag = child.tag
        if tag == f"{W}r":
            # skip runs that are descendants of hyperlinks (handled below)
            parent_map_skip = False
            # We process the run only if its immediate parent is the paragraph
            # element. Otherwise it's nested inside a hyperlink/structured
            # element that we handle separately.
            if child in list(p):
                pieces.append(_text_of_run(child))
            else:
                parent_map_skip = True
            _ = parent_map_skip
        elif tag == f"{W}hyperlink":
            link_text = "".join(_text_of_run(r) for r in child.findall(f"{W}r"))
            rid = child.get(f"{R}id")
            url = rels.get(rid or "", "")
            anchor = child.get(f"{W}anchor")
            if url:
                pieces.append(f"[{link_text}]({url})")
            elif anchor:
                pieces.append(f"[{link_text}](#{anchor})")
            else:
                pieces.append(link_text)
    return "".join(pieces).strip()


def _heading_level(p: ET.Element) -> int | None:
    pStyle = p.find(f"{W}pPr/{W}pStyle")
    if pStyle is None:
        return None
    val = (pStyle.get(f"{W}val") or "").lower()
    if val in {"title"}:
        return 1
    m = re.match(r"heading(\d+)$", val)
    if m:
        n = int(m.group(1))
        if 1 <= n <= 6:
            return n
    return None


def _list_info(p: ET.Element, numbering: dict[str, dict[int, str]]) -> tuple[str, int] | None:
    numPr = p.find(f"{W}pPr/{W}numPr")
    if numPr is None:
        return None
    ilvl_el = numPr.find(f"{W}ilvl")
    numId_el = numPr.find(f"{W}numId")
    if numId_el is None:
        return None
    numId = numId_el.get(f"{W}val") or ""
    ilvl = int((ilvl_el.get(f"{W}val") if ilvl_el is not None else "0") or "0")
    fmt = numbering.get(numId, {}).get(ilvl, "bullet")
    return (fmt, ilvl)


def _load_numbering(zf: zipfile.ZipFile) -> dict[str, dict[int, str]]:
    """Map numId -> level -> 'bullet' | 'decimal' | ..."""
    try:
        with zf.open("word/numbering.xml") as f:
            tree = ET.parse(f)
    except KeyError:
        return {}
    root = tree.getroot()

    # abstractNumId -> level -> format
    abstract: dict[str, dict[int, str]] = {}
    for abs_el in root.findall(f"{W}abstractNum"):
        aid = abs_el.get(f"{W}abstractNumId") or ""
        levels: dict[int, str] = {}
        for lvl in abs_el.findall(f"{W}lvl"):
            try:
                ilvl = int(lvl.get(f"{W}ilvl") or "0")
            except ValueError:
                continue
            fmt_el = lvl.find(f"{W}numFmt")
            fmt = (fmt_el.get(f"{W}val") if fmt_el is not None else "bullet") or "bullet"
            levels[ilvl] = fmt
        abstract[aid] = levels

    # numId -> abstractNumId
    mapping: dict[str, dict[int, str]] = {}
    for num_el in root.findall(f"{W}num"):
        nid = num_el.get(f"{W}numId") or ""
        ref = num_el.find(f"{W}abstractNumId")
        if ref is None:
            continue
        ref_id = ref.get(f"{W}val") or ""
        mapping[nid] = abstract.get(ref_id, {})
    return mapping


def _load_rels(zf: zipfile.ZipFile) -> dict[str, str]:
    """Map relationship id -> target URL for hyperlinks."""
    try:
        with zf.open("word/_rels/document.xml.rels") as f:
            tree = ET.parse(f)
    except KeyError:
        return {}
    ns = "{http://schemas.openxmlformats.org/package/2006/relationships}"
    out: dict[str, str] = {}
    for rel in tree.getroot().findall(f"{ns}Relationship"):
        if rel.get("Type", "").endswith("/hyperlink"):
            out[rel.get("Id", "")] = rel.get("Target", "")
    return out


def _render_table(tbl: ET.Element, rels: dict[str, str]) -> list[str]:
    rows_md: list[list[str]] = []
    for tr in tbl.findall(f"{W}tr"):
        cells: list[str] = []
        for tc in tr.findall(f"{W}tc"):
            cell_lines: list[str] = []
            for p in tc.findall(f"{W}p"):
                t = _paragraph_text(p, rels)
                if t:
                    cell_lines.append(t)
            cells.append(" ".join(cell_lines).replace("|", "\\|"))
        if cells:
            rows_md.append(cells)
    if not rows_md:
        return []
    width = max(len(r) for r in rows_md)
    for r in rows_md:
        while len(r) < width:
            r.append("")
    out = ["| " + " | ".join(rows_md[0]) + " |", "| " + " | ".join(["---"] * width) + " |"]
    for r in rows_md[1:]:
        out.append("| " + " | ".join(r) + " |")
    return out


def docx_to_markdown(path: Path) -> str:
    with zipfile.ZipFile(path) as zf:
        rels = _load_rels(zf)
        numbering = _load_numbering(zf)
        with zf.open("word/document.xml") as f:
            tree = ET.parse(f)

    body = tree.getroot().find(f"{W}body")
    if body is None:
        return ""

    lines: list[str] = []
    counters: dict[tuple[str, int], int] = {}
    prev_was_list = False

    for el in list(body):
        tag = el.tag
        if tag == f"{W}p":
            text = _paragraph_text(el, rels)
            heading = _heading_level(el)
            list_info = _list_info(el, numbering)

            if heading is not None and text:
                if lines and lines[-1] != "":
                    lines.append("")
                lines.append("#" * heading + " " + text)
                lines.append("")
                prev_was_list = False
                counters.clear()
            elif list_info is not None and text:
                fmt, ilvl = list_info
                indent = "  " * ilvl
                if fmt == "bullet":
                    lines.append(f"{indent}- {text}")
                else:
                    numId_el = el.find(f"{W}pPr/{W}numPr/{W}numId")
                    key = (numId_el.get(f"{W}val") or "", ilvl) if numId_el is not None else ("", ilvl)
                    counters[key] = counters.get(key, 0) + 1
                    lines.append(f"{indent}{counters[key]}. {text}")
                prev_was_list = True
            else:
                if prev_was_list and lines and lines[-1] != "":
                    lines.append("")
                if text:
                    lines.append(text)
                else:
                    if lines and lines[-1] != "":
                        lines.append("")
                prev_was_list = False
                counters.clear()
        elif tag == f"{W}tbl":
            if lines and lines[-1] != "":
                lines.append("")
            lines.extend(_render_table(el, rels))
            lines.append("")
            prev_was_list = False
            counters.clear()

    # collapse runs of >2 blank lines
    out: list[str] = []
    blanks = 0
    for line in lines:
        if line == "":
            blanks += 1
            if blanks <= 1:
                out.append(line)
        else:
            blanks = 0
            out.append(line)
    while out and out[-1] == "":
        out.pop()
    out.append("")
    return "\n".join(out)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: docx_to_md.py <input.docx> <output.md>", file=sys.stderr)
        return 2
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    md = docx_to_markdown(src)
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(md, encoding="utf-8")
    print(f"wrote {dst} ({len(md)} chars)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
