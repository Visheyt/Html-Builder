const fs = require('fs/promises');
const path = require('path');
const fs2 = require('fs');

async function mergeCss() {
  let directory = path.join(__dirname, 'styles');
  let finalDirectory = path.join(__dirname, 'project-dist');
  fs2.writeFile(path.join(finalDirectory, 'bundle.css'), '', (err) => {
    if (err) throw err;
  });
  try {
    let cssFiles = await fs.readdir(directory, {
      withFileTypes: true,
    });
    for (let cssFile of cssFiles) {
      if (cssFile.name.split('.')[1] === 'css') {
        let readStream = fs2.createReadStream(
          path.join(directory, cssFile.name),
          { encoding: 'utf-8' },
        );
        readStream.on('data', (chunk) => {
          fs.appendFile(
            path.join(finalDirectory, 'bundle.css'),
            chunk,
            (err) => {
              if (err) throw err;
            },
          );
        });
      }
    }
  } catch (error) {
    console.log(`We can\`t merge styles:${error}`);
  }
}
mergeCss();
