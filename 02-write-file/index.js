const { stdout } = process;
const { stdin } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (err) => {
  if (err) {
    console.log(err);
  }
});
stdout.write('Приветствую, пожалуйста введите данные для записи');
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

process.on('exit', () => {
  console.log('\nПрощайте милый господин,ну или госпожа');
});
