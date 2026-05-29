const fs = require('fs');
let code = fs.readFileSync('constants.tsx', 'utf-8');

// The goal here is just to view the array
console.log(code.substring(0, 500));
