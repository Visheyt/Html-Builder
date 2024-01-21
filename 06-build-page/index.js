const fs = require('fs/promises');
const path = require('path');
const fs2 = require('fs');

async function makeDir() {
  try {
    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  } catch (error) {
    console.log(`Не удалось создать папку сборки: ${error}`);
  }
}
makeDir();
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist', 'assets');

async function copyFunc() {
  try {
    await fs.mkdir(assetsCopy, { recursive: true });
    let files = await fs.readdir(assets, { withFileTypes: true });
    for (let file of files) {
      if (file.isDirectory) {
        await fs.mkdir(path.join(assetsCopy, file.name), { recursive: true });
        let items = await fs.readdir(path.join(assets, file.name));
        items.forEach((item) =>
          fs.copyFile(
            path.join(assets, file.name, item),
            path.join(assetsCopy, file.name, item),
          ),
        );
      }
    }
    console.log('Копирование файлов assets завершено');
  } catch (error) {
    console.log(`Ошибка при копировании файлов: ${error}`);
  }
}
copyFunc();

async function mergeCss() {
  let cssDir = path.join(__dirname, 'styles');
  let bundleCssDir = path.join(__dirname, 'project-dist');
  fs2.writeFile(path.join(bundleCssDir, 'style.css'), '', (err) => {
    if (err) throw err;
  });
  try {
    let cssFiles = await fs.readdir(cssDir, {
      withFileTypes: true,
    });
    for (let cssFile of cssFiles) {
      if (cssFile.name.split('.')[1] === 'css') {
        let readStream = fs2.createReadStream(path.join(cssDir, cssFile.name), {
          encoding: 'utf-8',
        });
        readStream.on('data', (chunk) => {
          fs.appendFile(path.join(bundleCssDir, 'style.css'), chunk, (err) => {
            if (err) throw err;
          });
        });
      }
    }
    console.log('Создание style.css завершено');
  } catch (error) {
    console.log(`We can\`t merge styles:${error}`);
  }
}
mergeCss();
