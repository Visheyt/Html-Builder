const fs = require('fs/promises');
const path = require('path');
//Make directions
const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');
//Async function
async function copyFunc() {
  try {
    //Make direction(use recursive obj for avoiding mistakes when directory already exists)
    await fs.mkdir(copyDirectory, { recursive: true });
    //Arrays of the files
    let files = await fs.readdir(directory);
    let copyFiles = await fs.readdir(copyDirectory);
    //If file is in files-copy, but not in files, it will be deleted
    if (copyFiles.length) {
      for (let copyFile of copyFiles) {
        await fs.unlink(path.join(copyDirectory, copyFile));
      }
    }
    //Copy process
    for (let file of files) {
      fs.copyFile(path.join(directory, file), path.join(copyDirectory, file));
    }
  } catch (error) {
    // Errors catch
    console.log(`Ошибка при копировании файлов: ${error}`);
  }
}
copyFunc();
