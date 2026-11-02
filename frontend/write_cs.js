const fs = require('fs');  
const path = require('path');  
const dest = path.join(__dirname, 'components', 'ComingSoonCard.tsx');  
fs.writeFileSync(dest, 'PLACEHOLDER');  
console.log('written to', dest);  
