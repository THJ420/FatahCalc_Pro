"""Generate optimized brand assets and the 1200x630 social card.

Run manually after changing brand art: python scripts/generate_assets.py
The build (npm run build) only regenerates HTML, sitemap and robots; these
binaries are committed so Vercel does not need Python or Pillow.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'Assets'
LOGO_DIR = ASSETS / 'Logo'
OG_DIR = ASSETS / 'og'
FAV_DIR = ASSETS / 'Favicon'
LOGO_DIR.mkdir(parents=True, exist_ok=True)
OG_DIR.mkdir(parents=True, exist_ok=True)

fonts = Path('C:/Windows/Fonts')
bold = str(fonts / 'segoeuib.ttf')
regular = str(fonts / 'segoeui.ttf')
mono = str(fonts / 'consolab.ttf')


def trim_alpha(image: Image.Image) -> Image.Image:
    bbox = image.getchannel('A').getbbox()
    return image.crop(bbox) if bbox else image


def make_mark(source: Path, target: Path) -> None:
    image = Image.open(source).convert('RGBA')
    image = trim_alpha(image)
    image.thumbnail((88, 88), Image.LANCZOS)
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    canvas.alpha_composite(image, ((96 - image.width) // 2, (96 - image.height) // 2))
    canvas.save(target, optimize=True)


make_mark(ROOT / 'logo_light_fav.png', LOGO_DIR / 'logo-light-96.png')
make_mark(ROOT / 'logo_dark_no_txt.png', LOGO_DIR / 'logo-dark-96.png')

favicon = Image.open(FAV_DIR / 'icon-192.png').convert('RGBA')
favicon.resize((64, 64), Image.LANCZOS).save(FAV_DIR / 'favicon-64.png', optimize=True)

W, H = 1200, 630
card = Image.new('RGB', (W, H), '#0a0e17')

# Soft brand glows.
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for box, color in [
    ((-260, -300, 760, 520), (56, 189, 248, 46)),
    ((620, -320, 1560, 460), (167, 139, 250, 38)),
    ((820, 380, 1500, 940), (52, 211, 153, 26)),
]:
    gdraw.ellipse(box, fill=color)
glow = glow.filter(ImageFilter.GaussianBlur(130))
card = Image.alpha_composite(card.convert('RGBA'), glow)

draw = ImageDraw.Draw(card)
for x in range(0, W, 48):
    draw.line((x, 0, x, H), fill=(151, 177, 210, 8))
for y in range(0, H, 48):
    draw.line((0, y, W, y), fill=(151, 177, 210, 8))

# Brand lockup.
mark = Image.open(FAV_DIR / 'icon-192.png').convert('RGBA')
mark = mark.resize((72, 72), Image.LANCZOS)
plate = Image.new('RGBA', (84, 84), (0, 0, 0, 0))
ImageDraw.Draw(plate).rounded_rectangle((0, 0, 83, 83), radius=20, fill=(15, 23, 42, 255), outline=(46, 64, 87, 255), width=1)
plate.alpha_composite(mark, (6, 6))
card.alpha_composite(plate, (72, 62))

draw = ImageDraw.Draw(card)
f_word = ImageFont.truetype(bold, 32)
f_byline = ImageFont.truetype(mono, 12)
draw.text((172, 70), 'FatahCalc', font=f_word, fill='#f1f5f9')
word_w = draw.textlength('FatahCalc', font=f_word)
draw.text((172 + word_w + 9, 70), 'Pro', font=f_word, fill='#7bd0ff')
draw.text((173, 110), 'BY FATAHTECH', font=f_byline, fill='#7d90a8')

# Headline with a cyan-to-violet gradient on the second line.
f_head = ImageFont.truetype(bold, 64)
draw.text((72, 184), 'Free All-in-One', font=f_head, fill='#e8eef9')

second = 'Calculator Suite'
mask = Image.new('L', (W, H), 0)
ImageDraw.Draw(mask).text((72, 258), second, font=f_head, fill=255)
gradient = Image.new('RGBA', (W, H))
gpx = gradient.load()
c1 = (56, 189, 248)
c2 = (167, 139, 250)
for y in range(H):
    t = max(0.0, min(1.0, (y - 240) / 160))
    r = int(c1[0] + (c2[0] - c1[0]) * t)
    g = int(c1[1] + (c2[1] - c1[1]) * t)
    b = int(c1[2] + (c2[2] - c1[2]) * t)
    for x in range(W):
        gpx[x, y] = (r, g, b, 255)
card = Image.composite(gradient, card, mask)
draw = ImageDraw.Draw(card)

f_sub = ImageFont.truetype(regular, 25)
f_chip = ImageFont.truetype(regular, 17)
draw.text((74, 352), '52 calculators & converters', font=f_sub, fill='#cbd5e1')
draw.text((74, 386), 'across 12 categories. 100% free.', font=f_sub, fill='#cbd5e1')

chips = ['100% free', 'No ads', 'Runs in your browser', 'Offline PWA']
x = 74
y = 444
for label in chips:
    tw = draw.textlength(label, font=f_chip)
    box_w = int(tw) + 34
    draw.rounded_rectangle((x, y, x + box_w, y + 38), radius=19, fill=(23, 28, 39, 255), outline=(45, 60, 80, 255), width=1)
    draw.ellipse((x + 14, y + 16, x + 20, y + 22), fill='#38bdf8')
    draw.text((x + 27, y + 9), label, font=f_chip, fill='#cbd5e1')
    x += box_w + 10

# Right-hand calculator preview panel.
panel = (700, 196, 1128, 500)
draw.rounded_rectangle(panel, radius=24, fill=(15, 19, 28, 235), outline=(41, 55, 74, 255), width=1)
draw.rounded_rectangle((700, 196, 1128, 240), radius=24, fill=(21, 27, 38, 255))
draw.rectangle((700, 220, 1128, 240), fill=(21, 27, 38, 255))
draw.ellipse((722, 210, 734, 222), fill='#fb7185')
draw.ellipse((744, 210, 756, 222), fill='#fbbf24')
draw.ellipse((766, 210, 778, 222), fill='#34d399')
f_panel = ImageFont.truetype(mono, 13)
draw.text((792, 208), 'PERCENTAGE / FINANCE', font=f_panel, fill='#7d90a8')

f_label = ImageFont.truetype(regular, 17)
f_big = ImageFont.truetype(bold, 72)
f_unit = ImageFont.truetype(bold, 30)
draw.text((728, 264), '15% of 200', font=f_label, fill='#8fa2b8')
draw.text((726, 292), '30', font=f_big, fill='#7bd0ff')
draw.text((726 + draw.textlength('30', font=f_big) + 8, 330), 'result', font=f_unit, fill='#8fa2b8')

# Mini bar chart + stat tiles.
bars = [12, 22, 16, 30, 20, 34]
bx = 728
for i, h in enumerate(bars):
    draw.rounded_rectangle((bx, 432 - h, bx + 22, 432), radius=5, fill=(56, 189, 248, 90 if i < 5 else 220))
    bx += 34
draw.line((722, 434, 1010, 434), fill=(45, 60, 80, 255), width=1)
draw.text((722, 448), 'Live preview', font=f_label, fill='#8fa2b8')

for idx, (label, value) in enumerate([('Remaining', '170'), ('Fraction', '0.15'), ('Total', '200')]):
    tx = 1024
    ty = 264 + idx * 64
    draw.text((tx, ty), label, font=f_panel, fill='#7d90a8')
    f_val = ImageFont.truetype(bold, 22)
    draw.text((tx, ty + 18), value, font=f_val, fill='#e8eef9')

# Footer line.
f_url = ImageFont.truetype(mono, 20)
draw.text((72, 556), 'calc.fatahtech.com', font=f_url, fill='#7bd0ff')
f_note = ImageFont.truetype(regular, 16)
note = 'Free browser tools by FatahTech'
draw.text((W - 72 - draw.textlength(note, font=f_note), 558), note, font=f_note, fill='#9fb2c7')

draw.rectangle((0, 0, W - 1, H - 1), outline=(30, 42, 59, 255), width=2)

card.convert('RGB').save(OG_DIR / 'fatahcalc-pro-og.png', optimize=True)
print('wrote', LOGO_DIR / 'logo-light-96.png', LOGO_DIR / 'logo-dark-96.png')
print('wrote', FAV_DIR / 'favicon-64.png')
print('wrote', OG_DIR / 'fatahcalc-pro-og.png')
