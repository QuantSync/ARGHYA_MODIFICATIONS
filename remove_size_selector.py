filepath = r'c:\Users\anubh\StudioProjects\ARGHYA_MODIFICATIONS\frontend\app\products\[slug]\page.tsx'

with open(filepath, 'rb') as f:
    raw = f.read()

content = raw.decode('utf-8', errors='replace')

# The size selector block starts at "{/* Size Selector */}" and ends after the closing </div>
# We'll find it line by line
lines = content.split('\n')

start_idx = None
end_idx = None

for i, line in enumerate(lines):
    if '{/* Size Selector */}' in line and start_idx is None:
        start_idx = i
    if start_idx is not None and end_idx is None:
        # Look for the closing div that ends this block - it's the div with class="space-y-2"
        # We need to count the nesting depth
        pass

# Let's do it by finding the start marker and counting braces
# Find the line index
for i, line in enumerate(lines):
    if '{/* Size Selector */}' in line:
        start_idx = i
        print(f"Found Size Selector at line {i+1}: {repr(line[:80])}")
        break

if start_idx is None:
    print("ERROR: Could not find Size Selector block!")
else:
    # Count opening/closing divs from start_idx to find where the block ends
    # The block starts with <div className="space-y-2"> 
    depth = 0
    in_block = False
    end_idx = None
    
    for i in range(start_idx, len(lines)):
        line = lines[i]
        opens = line.count('<div') + line.count('<button') + line.count('<label') + line.count('<span') + line.count('<p>')
        closes = line.count('</div>') + line.count('</button>') + line.count('</label>') + line.count('</span>') + line.count('</p>')
        
        if i == start_idx:
            in_block = True
        
        depth += opens - closes
        
        if in_block and depth <= 0 and i > start_idx:
            end_idx = i
            print(f"Block ends at line {i+1}: {repr(line[:80])}")
            break
    
    if end_idx is not None:
        print(f"Removing lines {start_idx+1} to {end_idx+1}")
        # Remove the block including a blank line before it
        # Check if line before start_idx is blank
        remove_start = start_idx
        if start_idx > 0 and lines[start_idx - 1].strip() == '':
            remove_start = start_idx - 1
        
        new_lines = lines[:remove_start] + lines[end_idx + 1:]
        new_content = '\n'.join(new_lines)
        
        with open(filepath, 'wb') as f:
            f.write(new_content.encode('utf-8'))
        print(f"Done! Removed {end_idx - remove_start + 1} lines.")
    else:
        print("ERROR: Could not find end of block!")
        # Print surrounding lines for debug
        for i in range(start_idx, min(start_idx+60, len(lines))):
            print(f"{i+1}: {repr(lines[i][:100])}")
