const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});
readStream.on('data', (chunk) => {
  console.log(chunk);
});
