import os
from pathlib import Path
from PIL import Image

# Paths
input_path = Path(r"C:/Users/anubh/.gemini/antigravity/brain/b535d483-8494-4c6f-9c47-7bd29d1a00b1/.user_uploaded/media_1793522448426_e4507eec.jpg")
output_dir = Path(r"C:/Users/anubh/StudioProjects/ARGHYA_MODIFICATIONS/frontend/public/images")
output_dir.mkdir(parents=True, exist_ok=True)

# Load image
im = Image.open(input_path).convert("RGBA")
width, height = im.size

# Make white background transparent
pix = im.load()
for y in range(height):
    for x in range(width):
        r, g, b, a = pix[x, y]
        # if near white, make transparent
        if r > 240 and g > 240 and b > 240:
            pix[x, y] = (255, 255, 255, 0)

# Trim excess whitespace (transparent rows/cols)
# Find bounding box of non-transparent pixels
bbox = im.getbbox()
if bbox:
    im = im.crop(bbox)

# Save full-size logo (max width ~300)
max_width = 300
if im.width > max_width:
    ratio = max_width / im.width
    new_height = int(im.height * ratio)
    im_resized = im.resize((max_width, new_height), Image.LANCZOS)
else:
    im_resized = im
im_resized.save(output_dir / "arghya_watermark_logo.png")

# Save smaller version for navbar (height ~40)
navbar_height = 40
ratio = navbar_height / im_resized.height
navbar_width = int(im_resized.width * ratio)
navbar_img = im_resized.resize((navbar_width, navbar_height), Image.LANCZOS)
navbar_img.save(output_dir / "arghya_watermark_logo_nav.png")

print("Processed logo saved:", output_dir / "arghya_watermark_logo.png", output_dir / "arghya_watermark_logo_nav.png")

