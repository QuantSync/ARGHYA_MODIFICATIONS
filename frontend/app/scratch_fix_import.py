import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('frontend/app/products/[slug]/page.tsx', 'r', encoding='utf-8', newline='') as f:
    content = f.read()

# Check if import is there
if 'BuyNowChoiceModal' in content:
    print('BuyNowChoiceModal found in content')
    # Find the line number
    lines = content.split('\n')
    for i, line in enumerate(lines[:25]):
        if 'BuyNow' in line or 'import' in line:
            print(f'Line {i+1}: {line[:120]}')
else:
    print('BuyNowChoiceModal NOT in content - need to add import')
    # Add the import
    old = "import { BuyCODButton } from '../../../components/buttons/BuyCODButton';\r\n"
    new = "import { BuyCODButton } from '../../../components/buttons/BuyCODButton';\r\nimport { BuyNowChoiceModal } from '../../../components/modals/BuyNowChoiceModal';\r\nimport { getDedicatedPaymentUrl } from '../../../lib/paymentHelper';\r\n"
    if old in content:
        content = content.replace(old, new)
        with open('frontend/app/products/[slug]/page.tsx', 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print('OK: import added')
    else:
        print('ERROR: could not find insertion point')

