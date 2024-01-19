const fs = require('fs');
const path = require('path');

let directory = path.join(process.argv[1], 'files');
console.log(directory);
fs.mkdir(path.resolve(__dirname, 'files-copy'), (err) => {
  if (err) {
    return err;
  }
});
fs.readdir(directory, (err, files) => {
  let copyDirectory = path.join(process.argv[1], 'files-copy');
  if (err) {
    return err;
  }
  for (let file of files) {
    fs.copyFile(
      path.join(directory, file),
      path.join(copyDirectory, file),
      (err) => {
        if (err) {
          return err;
        }
        console.log('файл Скопирован');
      },
    );
  }
});
