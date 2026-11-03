filepath = r'c:\Users\anubh\StudioProjects\ARGHYA_MODIFICATIONS\frontend\app\products\[slug]\page.tsx'

with open(filepath, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Add BuyNowChoiceModal JSX after SoldOutSizeModal closing
# The SoldOutSizeModal ends with: "        onSelectSize={(size) => setSelectedSize(size)}\r\n      />\r\n"
marker = "        onSelectSize={(size) => setSelectedSize(size)}\r\n      />"

if 'BuyNowChoiceModal' in content and '<BuyNowChoiceModal' not in content:
    if marker in content:
        replacement = marker + """\r\n      <BuyNowChoiceModal\r\n        isOpen={isBuyNowChoiceOpen}\r\n        onClose={() => setIsBuyNowChoiceOpen(false)}\r\n        product={product as Product}\r\n        selectedSize={selectedSize}\r\n        onPayOnline={() => setBuyNowProduct(product as Product)}\r\n        onCashOnDelivery={() => setIsCODModalOpen(true)}\r\n        onPayOnDelivery={() => setIsPODModalOpen(true)}\r\n      />"""
        content = content.replace(marker, replacement)
        print("Added BuyNowChoiceModal JSX")
    else:
        print("Marker not found! Looking for alternatives...")
        # Try with \n only
        marker2 = "        onSelectSize={(size) => setSelectedSize(size)}\n      />"
        if marker2 in content:
            replacement2 = marker2 + "\n      <BuyNowChoiceModal\n        isOpen={isBuyNowChoiceOpen}\n        onClose={() => setIsBuyNowChoiceOpen(false)}\n        product={product as Product}\n        selectedSize={selectedSize}\n        onPayOnline={() => setBuyNowProduct(product as Product)}\n        onCashOnDelivery={() => setIsCODModalOpen(true)}\n        onPayOnDelivery={() => setIsPODModalOpen(true)}\n      />"
            content = content.replace(marker2, replacement2)
            print("Added with \\n marker")
        else:
            # Print surrounding area
            idx = content.find('onSelectSize')
            if idx != -1:
                print("Found onSelectSize at:", repr(content[idx:idx+100]))
elif '<BuyNowChoiceModal' in content:
    print("BuyNowChoiceModal JSX already present")
else:
    print("BuyNowChoiceModal import not found")

with open(filepath, 'wb') as f:
    f.write(content.encode('utf-8'))

print("Done.")

