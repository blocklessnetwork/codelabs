const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const codelabsDir = './labs';

function createStubFolder(title) {
  // Create a web-friendly stub by replacing spaces with hyphens and making it lowercase
  return title.toLowerCase().replace(/\s+/g, '-');
}

function createCodelabJson(stubFolder, title, duration, summary) {
  const codelabData = {
    environment: 'web',
    format: 'html',
    // Add other properties as needed
    title,
    duration,
    summary,
  };

  const codelabJsonPath = path.join(codelabsDir, stubFolder, 'codelab.json');

  fs.writeFile(codelabJsonPath, JSON.stringify(codelabData, null, 2), (err) => {
    if (err) {
      console.error('Error writing to codelab.json:', err);
    } else {
      console.log(`codelab.json created and placed in '${stubFolder}' folder.`);
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

      createCodelabJson(stubFolder, title, duration, summary);
    });
  });
});
