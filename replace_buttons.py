filepath = r'c:\Users\anubh\StudioProjects\ARGHYA_MODIFICATIONS\frontend\app\products\[slug]\page.tsx'

with open(filepath, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# The old THREE PAYMENT BUTTONS block to replace
old_block = """{/* ── THREE PAYMENT BUTTONS ── */}\r\n          <div className=\"flex flex-col gap-3 pt-1\">\r\n            {/* 1. Buy Now */}\r\n            <button\r\n              type=\"button\"\r\n              onClick={() => setIsBuyNowChoiceOpen(true)}\r\n              className=\"w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center gap-2 transition-colors\"\r\n            >\r\n              Buy Now\r\n            </button>\r\n\r\n            {/* 2. Buy Now · Cash on Delivery */}\r\n            <BuyCODButton\r\n              onClick={() => setIsCODModalOpen(true)}\r\n              size=\"lg\"\r\n              fadeDelay={0.2}\r\n              className=\"w-full\"\r\n            />\r\n\r\n            {/* 3. Buy Now · Pay on Delivery */}\r\n            <motion.button\r\n              type=\"button\"\r\n              whileHover={{ scale: 1.02, y: -1 }}\r\n              whileTap={{ scale: 0.98 }}\r\n              onClick={() => setIsPODModalOpen(true)}\r\n              className=\"w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg border border-emerald-400/30 cursor-pointer\"\r\n            >\r\n              <Truck size={15} />\r\n              Buy Now with Pay On Delivery\r\n            </motion.button>\r\n\r\n            {/* Add to Bag */}\r\n            <button\r\n              type=\"button\"\r\n              onClick={() => addItem(product, {\r\n                id: `v-${product.slug}-${selectedColorIdx}`,\r\n                product_id: product.id,\r\n                size: selectedSize,\r\n                color: activeColorOption?.colorName || 'Default',\r\n                sku: `ARG-${product.slug.toUpperCase()}`,\r\n                quantity_avail: 15\r\n              })}\r\n              className=\"w-full bg-transparent border border-burgundy-800/20 dark:border-amber-500/30 text-burgundy-900 dark:text-amber-500 hover:bg-burgundy-50 dark:hover:bg-amber-500/10 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors\"\r\n            >\r\n              <ShoppingBag size={15} />\r\n              Add to Shopping Bag\r\n            </button>\r\n          </div>"""

new_block = """{/* ── PAYMENT BUTTONS (Add To Cart | Buy Now) ── */}\r\n          <div className=\"flex flex-col gap-3 pt-1\">\r\n            <div className=\"flex gap-3\">\r\n              <button\r\n                type=\"button\"\r\n                onClick={() => addItem(product, {\r\n                  id: `v-${product.slug}-${selectedColorIdx}`,\r\n                  product_id: product.id,\r\n                  size: selectedSize,\r\n                  color: activeColorOption?.colorName || 'Default',\r\n                  sku: `ARG-${product.slug.toUpperCase()}`,\r\n                  quantity_avail: 15\r\n                })}\r\n                className=\"flex-1 bg-white dark:bg-transparent border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200\"\r\n              >\r\n                <ShoppingBag size={15} />\r\n                Add To Cart\r\n              </button>\r\n              <button\r\n                type=\"button\"\r\n                onClick={() => setIsBuyNowChoiceOpen(true)}\r\n                className=\"flex-1 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg\"\r\n              >\r\n                Buy Now\r\n              </button>\r\n            </div>\r\n          </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    print("SUCCESS: Replaced old 4-button block with new Add To Cart | Buy Now layout")
else:
    print("Block not found exactly. Searching for key markers...")
    # Try to find THREE PAYMENT BUTTONS comment and surrounding
    if 'THREE PAYMENT BUTTONS' in content:
        idx = content.find('THREE PAYMENT BUTTONS')
        print("Found comment at index:", idx)
        print("Surrounding 200 chars:", repr(content[idx-20:idx+200]))
    else:
        print("THREE PAYMENT BUTTONS comment not found either!")
        # Show lines 590-640 for debug
        lines = content.split('\n')
        for i, l in enumerate(lines[588:642], 589):
            print(f"{i}: {repr(l[:100])}")

with open(filepath, 'wb') as f:
    f.write(content.encode('utf-8'))

print("File saved.")
