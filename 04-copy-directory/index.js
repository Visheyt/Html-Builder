const fs = require('fs/promises');
const path = require('path');

const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');
async function copyFunc() {
  try {
    await fs.mkdir(copyDirectory, { recursive: true });
    let files = await fs.readdir(directory);
    let copyFiles = await fs.readdir(copyDirectory);
    if (copyFiles.length) {
      for (let copyFile of copyFiles) {
        await fs.unlink(path.join(copyDirectory, copyFile));
      }
    }
    for (let file of files) {
      fs.copyFile(path.join(directory, file), path.join(copyDirectory, file));
    }
  } catch (error) {
    console.log(`Ошибка при копировании файлов: ${error}`);
  }
}
copyFunc();
