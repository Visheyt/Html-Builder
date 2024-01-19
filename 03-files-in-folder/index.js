const path = require('path');
const fs = require('fs');

let directory = process.argv[1];
let finaDirectory = path.join(directory, 'secret-folder');
fs.readdir(finaDirectory, (err, items) => {
  if (err) {
    return err;
  }
  for (let item of items) {
    fs.stat(path.join(finaDirectory, item), (err, stats) => {
      if (err) {
        return err;
      }
      if (stats.isFile()) {
        let fileName = item.split('.');
        console.log(`${fileName[0]} - ${fileName[1]} - ${stats.size}B`);
      }
    });
  }
});
