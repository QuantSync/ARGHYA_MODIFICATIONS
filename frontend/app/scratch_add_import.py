import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('frontend/app/products/[slug]/page.tsx', 'r', encoding='utf-8', newline='') as f:
    content = f.read()

# Find the exact location of the import line to add after
target = "import { BuyCODButton } from '../../../components/buttons/BuyCODButton';\r\nimport { CODChoiceModal } from '../../../components/modals/CODChoiceModal';\r\nimport { PayOnDeliveryModal } from '../../../components/modals/PayOnDeliveryModal';\r\nimport { BuyNowChoiceModal } from '../../../components/modals/BuyNowChoiceModal';\r\nimport { getDedicatedPaymentUrl } from '../../../lib/paymentHelper';"

if target in content:
    print('OK - imports already correct')
else:
    # Try to find and fix  
    after_pod = "import { PayOnDeliveryModal } from '../../../components/modals/PayOnDeliveryModal';\r\nimport { ProductReviewsModal }"
    if after_pod in content:
        new_after_pod = "import { PayOnDeliveryModal } from '../../../components/modals/PayOnDeliveryModal';\r\nimport { BuyNowChoiceModal } from '../../../components/modals/BuyNowChoiceModal';\r\nimport { getDedicatedPaymentUrl } from '../../../lib/paymentHelper';\r\nimport { ProductReviewsModal }"
        content = content.replace(after_pod, new_after_pod)
        with open('frontend/app/products/[slug]/page.tsx', 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print('OK: imports added after PayOnDeliveryModal')
    else:
        # manual search
        idx = content.find("PayOnDeliveryModal")
        print('PayOnDeliveryModal at char:', idx)
        print('Context:', repr(content[idx:idx+200]))

