import re

filepath = r'c:\Users\anubh\StudioProjects\ARGHYA_MODIFICATIONS\frontend\app\products\[slug]\page.tsx'

with open(filepath, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# Remove the bad import line
bad_line = "import { getDedicatedPaymentUrl } from '../../../lib/paymentHelper';"
if bad_line in content:
    # Remove the line + its line ending
    content = content.replace(bad_line + '\r\n', '')
    content = content.replace(bad_line + '\n', '')
    content = content.replace(bad_line, '')
    print('REMOVED bad import successfully')
else:
    print('Bad import line not found, checking file lines...')
    for i, line in enumerate(content.split('\n')[:25], 1):
        print(f'{i}: {repr(line[:100])}')

with open(filepath, 'wb') as f:
    f.write(content.encode('utf-8'))

print('Done.')

