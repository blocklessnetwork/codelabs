const readline = require('readline');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const codelabsDir = './labs';

function createStubFolder(title) {
  // Create a web-friendly stub by replacing spaces with hyphens and making it lowercase
  return title.toLowerCase().replace(/\s+/g, '-');
}

function createCodelabMd(stubFolder, title, duration, summary) {
  const codelabData = `
author: ${pkg.codelab.author}
summary: ${summary}
id: ${stubFolder}
categories: codelab,markdown
environments: Web
status: Published
feedback link: ${pkg.codelab['feedback-url']}
analytics account: ${pkg.codelab['ga-analytics']}

# ${title}
`;

  const codelabMdPath = path.join(codelabsDir, stubFolder, 'codelab.md');

  fs.writeFile(codelabMdPath, codelabData, (err) => {
    if (err) {
      console.error('Error writing to codelab.md:', err);
    } else {
      console.log(`codelab.md created and placed in '${stubFolder}' folder.`);
    }
    rl.close();
  });
}

rl.question('Enter the title of the codelab: ', (title) => {
  rl.question('Enter the duration (in minutes): ', (duration) => {
    rl.question('Enter a brief summary: ', (summary) => {
      const stubFolder = createStubFolder(title);
      const codelabFolderPath = path.join(codelabsDir, stubFolder);

      // Create the stub folder if it doesn't exist
      if (!fs.existsSync(codelabFolderPath)) {
        fs.mkdirSync(codelabFolderPath, { recursive: true });
      }

      createCodelabMd(stubFolder, title, duration, summary);
    });
  });
});
