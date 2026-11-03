import re

filepath = r'c:\Users\anubh\StudioProjects\ARGHYA_MODIFICATIONS\frontend\app\products\[slug]\page.tsx'

with open(filepath, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Step 1: Remove the bad import (if present)
bad = "import { getDedicatedPaymentUrl } from '../../../lib/paymentHelper';"
if bad in content:
    content = content.replace(bad + '\r\n', '').replace(bad + '\n', '').replace(bad, '')
    print("Step 1: Removed bad import")
else:
    print("Step 1: Bad import not found (already gone)")

# Step 2: Add BuyNowChoiceModal import after PayOnDeliveryModal import
target_import = "import { PayOnDeliveryModal } from '../../../components/modals/PayOnDeliveryModal';"
if target_import in content and 'BuyNowChoiceModal' not in content:
    content = content.replace(
        target_import,
        target_import + '\r\nimport { BuyNowChoiceModal } from \'../../../components/modals/BuyNowChoiceModal\';'
    )
    print("Step 2: Added BuyNowChoiceModal import")
elif 'BuyNowChoiceModal' in content:
    print("Step 2: BuyNowChoiceModal import already present")
else:
    print("Step 2: WARNING - Could not find PayOnDeliveryModal import")

# Step 3: Remove the Size Selector block
# The block is: {/* Size Selector */} ... </div>\n          </div>
# We'll find the exact text to replace
size_selector_start = '{/* Size Selector */}'
if size_selector_start not in content:
    print("Step 3: Size selector comment not found!")
else:
    # Find start position
    start_pos = content.find(size_selector_start)
    # Find the outermost closing div by counting <div and </div> from the opening <div> before the comment
    # The block structure is:
    #   {/* Size Selector */}
    #   <div className="space-y-2">   <- depth 1
    #     ...lots of nested content...
    #   </div>                         <- depth 0 -> this is the end
    
    # Find the <div after the comment
    first_div_pos = content.find('<div', start_pos)
    
    depth = 0
    i = first_div_pos
    end_pos = None
    
    while i < len(content):
        if content[i:i+4] == '<div':
            depth += 1
            i += 4
        elif content[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                end_pos = i + 6  # include the closing </div>
                break
            i += 6
        else:
            i += 1
    
    if end_pos is None:
        print("Step 3: Could not find end of size selector block!")
    else:
        # The block to remove: from the comment (including the whitespace/newline before it) to end_pos
        # Also remove the blank line before the comment if present
        block_to_remove = content[start_pos:end_pos]
        print(f"Step 3: Block to remove ({len(block_to_remove)} chars): starts='{block_to_remove[:60]}'... ends='{block_to_remove[-60:]}'")
        
        # Remove the block + trailing newline
        remove_str = content[start_pos:end_pos]
        # Also check for trailing \r\n or \n
        after = content[end_pos:end_pos+2]
        if after.startswith('\r\n'):
            end_pos += 2
        elif after.startswith('\n'):
            end_pos += 1
        
        # Check for leading whitespace line (the indented blank line before comment)
        # Find if there's just whitespace between previous \n and start_pos
        before_comment = content[:start_pos]
        last_newline = before_comment.rfind('\n')
        if last_newline != -1:
            between = before_comment[last_newline+1:start_pos]
            if between.strip() == '':
                # Remove the entire preceding line too
                start_pos = last_newline + 1
                # Also check for \r before this \n
                if last_newline > 0 and before_comment[last_newline-1] == '\r':
                    start_pos = last_newline  # keep going to remove \r\n
        
        content = content[:start_pos] + content[end_pos:]
        print(f"Step 3: Size selector block removed successfully!")

# Step 4: Add isBuyNowChoiceOpen state if not present
if 'isBuyNowChoiceOpen' not in content:
    # Add after isCODModalOpen state
    cod_state = 'const [isCODModalOpen, setIsCODModalOpen] = useState(false);'
    if cod_state in content:
        content = content.replace(
            cod_state,
            'const [isBuyNowChoiceOpen, setIsBuyNowChoiceOpen] = useState(false);\r\n  ' + cod_state
        )
        print("Step 4: Added isBuyNowChoiceOpen state")
    else:
        print("Step 4: Could not find isCODModalOpen to add state after it")
else:
    print("Step 4: isBuyNowChoiceOpen state already present")

# Step 5: Add BuyNowChoiceModal JSX after SoldOutSizeModal JSX if not present
if '<BuyNowChoiceModal' not in content:
    sold_out_close = '</SoldOutSizeModal>'
    if sold_out_close in content:
        # Find the closing of SoldOutSizeModal block
        pos = content.find(sold_out_close) + len(sold_out_close)
        bncm_jsx = '''\r\n      <BuyNowChoiceModal\r\n        isOpen={isBuyNowChoiceOpen}\r\n        onClose={() => setIsBuyNowChoiceOpen(false)}\r\n        product={product as Product}\r\n        selectedSize={selectedSize}\r\n        onPayOnline={() => setBuyNowProduct(product as Product)}\r\n        onCashOnDelivery={() => setIsCODModalOpen(true)}\r\n        onPayOnDelivery={() => setIsPODModalOpen(true)}\r\n      />'''
        content = content[:pos] + bncm_jsx + content[pos:]
        print("Step 5: Added BuyNowChoiceModal JSX")
    else:
        print("Step 5: Could not find </SoldOutSizeModal>")
else:
    print("Step 5: BuyNowChoiceModal JSX already present")

# Step 6: Change Buy Now button to open BuyNowChoiceModal instead of direct redirect
# Find the Buy Now button and update its onClick
old_buy_now_onclick = "onClick={() => setBuyNowProduct(product as Product)}"
# The button text should be near "Buy Now"
if 'setIsBuyNowChoiceOpen(true)' not in content:
    # Find the Buy Now button - it's in the button row area
    # Look for a button with "Buy Now" text that has setBuyNowProduct
    if old_buy_now_onclick in content:
        # Count occurrences - there may be multiple, we want the one near "Buy Now" text
        idx = content.find(old_buy_now_onclick)
        while idx != -1:
            surrounding = content[idx:idx+200]
            if 'Buy Now' in surrounding or 'BuyNow' in surrounding:
                content = content[:idx] + 'onClick={() => setIsBuyNowChoiceOpen(true)}' + content[idx+len(old_buy_now_onclick):]
                print("Step 6: Updated Buy Now button onClick")
                break
            idx = content.find(old_buy_now_onclick, idx+1)
        else:
            print("Step 6: Could not find Buy Now button with setBuyNowProduct")
    else:
        print("Step 6: setBuyNowProduct onClick not found")
else:
    print("Step 6: Buy Now button already uses setIsBuyNowChoiceOpen")

with open(filepath, 'wb') as f:
    f.write(content.encode('utf-8'))

print("\nAll steps done. File saved.")
