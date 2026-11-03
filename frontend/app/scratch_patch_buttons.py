import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('frontend/app/products/[slug]/page.tsx', 'r', encoding='utf-8', newline='') as f:
    content = f.read()

SM = '{/* \u2500\u2500 THREE PAYMENT BUTTONS \u2500\u2500 */}'
EM = '{/* \u2500\u2500 Trust Badges Image \u2500\u2500 */}'
idx_start = content.find(SM)
idx_end = content.find(EM)
print('START:', idx_start, 'END:', idx_end)

if idx_start < 0 or idx_end < 0:
    print('ERROR: markers not found')
    sys.exit(1)

new_buttons = (
    '{/* \u2500\u2500 PAYMENT BUTTONS (Add To Cart | Buy Now) \u2500\u2500 */}\r\n'
    '          <div className="flex flex-col gap-3 pt-1">\r\n'
    '            <div className="flex gap-3">\r\n'
    '              <button\r\n'
    '                type="button"\r\n'
    '                onClick={() => addItem(product, {\r\n'
    '                  id: `v-${product.slug}-${selectedColorIdx}`,\r\n'
    '                  product_id: product.id,\r\n'
    '                  size: selectedSize,\r\n'
    "                  color: activeColorOption?.colorName || 'Default',\r\n"
    '                  sku: `ARG-${product.slug.toUpperCase()}`,\r\n'
    '                  quantity_avail: 15\r\n'
    '                })}\r\n'
    '                className="flex-1 bg-white dark:bg-transparent border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200"\r\n'
    '              >\r\n'
    '                <ShoppingBag size={15} />\r\n'
    '                Add To Cart\r\n'
    '              </button>\r\n'
    '              <button\r\n'
    '                type="button"\r\n'
    '                onClick={() => setIsBuyNowChoiceOpen(true)}\r\n'
    '                className="flex-1 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"\r\n'
    '              >\r\n'
    '                Buy Now\r\n'
    '              </button>\r\n'
    '            </div>\r\n'
    '          </div>\r\n'
    '\r\n'
    '\r\n'
    '          '
)

content = content[:idx_start] + new_buttons + content[idx_end:]

with open('frontend/app/products/[slug]/page.tsx', 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print('OK: buttons replaced successfully')

