"""Extract testimonials from index.html and apply to other pages."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
start = INDEX.index("    <!-- Testimonials Section -->")
end = INDEX.index("\n    <!-- Contact + Footer Section -->", start)
BLOCK = INDEX[start:end] + "\n"


def replace_between(path: Path, start_marker: str, end_marker: str) -> None:
    text = path.read_text(encoding="utf-8")
    s = text.index(start_marker)
    e = text.index(end_marker, s)
    path.write_text(text[:s] + BLOCK + text[e:], encoding="utf-8")
    print(f"replaced: {path.name}")


def insert_before(path: Path, marker: str, snippet: str) -> None:
    text = path.read_text(encoding="utf-8")
    i = text.index(marker)
    path.write_text(text[:i] + snippet + text[i:], encoding="utf-8")
    print(f"inserted: {path.name}")


# approachPage: remove BLOCK 4 comment + old section
ap = ROOT / "approachPage.html"
ap_text = ap.read_text(encoding="utf-8")
ap_s = ap_text.index(
    "    <!-- ═══════════════════════════════════════════════════════════\n"
    "         BLOCK 4 — \"What our Clients Love about Occamode\"\n"
    "         ═══════════════════════════════════════════════════════════ -->"
)
ap_e = ap_text.index(
    "    <!-- Contact + Footer Section (same structure as index.html) -->", ap_s
)
ap.write_text(ap_text[:ap_s] + BLOCK + ap_text[ap_e:], encoding="utf-8")
print("replaced: approachPage.html")

replace_between(
    ROOT / "devops.html",
    "    <!-- Testimonials (slider wired in main.js via shared IDs) -->",
    "    <!-- DevOps journey + CTA + Footer (gradient full-bleed; content max-w 1280 + gutters) -->",
)
replace_between(
    ROOT / "webservice.html",
    "    <!-- Testimonials -->",
    "    <!-- Contact + Footer Section -->",
)
replace_between(
    ROOT / "ui-ux.html",
    "    <!-- Happy Clients Speak (Testimonials) -->",
    "    <!-- Contact + Footer Section (gradient full-bleed; content max-w 1280 + gutters) -->",
)
replace_between(
    ROOT / "mobile-app-service.html",
    "    <!-- Testimonials -->",
    "    <!-- Contact + Footer Section (gradient full-bleed; content max-w 1280 + gutters) -->",
)
replace_between(
    ROOT / "iot.html",
    "    <!-- Testimonials Section (same block as index.html) -->",
    "    <!-- Ease Your IoT Development Journey -->",
)
replace_between(
    ROOT / "productEngineering.html",
    "    <!-- Testimonials Section (same block as index.html) -->",
    "    <!-- Overcoming Technical Challenges; then CTA + Footer (shell matches iot.html) -->",
)
replace_between(
    ROOT / "casestudies.html",
    "    <!-- Testimonials -->",
    "    <!-- CTA + Footer (same shell as index.html) -->",
)

insert_before(
    ROOT / "about.html",
    "    <!-- Contact + Footer Section (same shell as index.html) -->",
    BLOCK,
)
insert_before(
    ROOT / "contactus.html",
    "    <!-- Footer -->",
    BLOCK,
)

# Case study: hidden until a case loads (same as footer)
# Match index section open tag (bg/padding may change on home)
cs_open = re.search(
    r"<section class=\"(w-full [^\"]+)\">", BLOCK, re.MULTILINE
)
if not cs_open:
    raise SystemExit("Could not find testimonials <section> open tag in index.html")
cs_block = BLOCK.replace(
    f'<section class="{cs_open.group(1)}">',
    f'<section id="csTestimonialsSection" class="hidden {cs_open.group(1)}">',
    1,
)
insert_before(
    ROOT / "casestudy.html",
    "    <!-- CTA + Footer (same shell as index.html / casestudies.html) -->",
    cs_block,
)

print("done")
