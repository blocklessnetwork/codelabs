const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const codelabsDir = './labs';

function updateCodelabMd(codelabMdPath) {
  fs.readFile(codelabMdPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${codelabMdPath}:`, err);
      return;
    }

    const updatedData = data
      .replace(/author: .*/g, `author: ${pkg.codelab.author}`)
      .replace(/analytics account: .*/g, `analytics account: ${pkg.codelab['ga-analytics']}`)
      .replace(/feedback link: .*/g, `feedback link: ${pkg.codelab['feedback-url']}`);

    fs.writeFile(codelabMdPath, updatedData, (err) => {
      if (err) {
        console.error(`Error writing file ${codelabMdPath}:`, err);
      } else {
        console.log(`Updated codelab.md at ${codelabMdPath}.`);
      }
    });
  });
}

function traverseDir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          traverseDir(filePath);
        } else if (path.extname(filePath) === '.md' && path.basename(filePath) === 'codelab.md') {
          updateCodelabMd(filePath);
        }
      });
    }
  });
}

traverseDir(codelabsDir);
