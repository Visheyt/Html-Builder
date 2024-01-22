const { stdout } = process;
const { stdin } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (err) => {
  if (err) {
    console.log(err);
  }
});
stdout.write('Hello, please enter your information.\n');
let string = '';
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    string += data.toString().trim();
    let writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
    writeStream.write(string);
  }
});
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => {
  console.log('\nThank you, good bye!');
});
