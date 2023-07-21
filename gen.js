const fs = require('fs');
const path = require('path');

const distFolderPath = './public'; // The path to the directory containing randomly named directories

// Read the directories in the './dist' folder
fs.readdir(distFolderPath, { withFileTypes: true }, (err, directoryEntries) => {
  if (err) {
    console.error('Error reading the dist folder:', err);
    return;
  }

  // Filter only directories
  const directories = directoryEntries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  // Generate HTML content for each codelab.json file in each directory
  const htmlContent = directories.map(directory => {
    const codelabJsonPath = path.join(distFolderPath, directory, 'codelab.json');
    if (!fs.existsSync(codelabJsonPath)) {
      console.warn(`codelab.json not found in directory: ${directory}`);
      return '';
    }

    const codelabData = require(path.resolve(codelabJsonPath));

    return `
      <li>
        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
          <h2>${codelabData.title}</h2>
          <p>Time to Completion: ${codelabData.duration} minutes</p>
          <p>${codelabData.summary}</p>
          <a href="./${directory}/index.html">View Codelab</a>
        </div>
      </li>`;
  }).join('');

  // Generate the final HTML content
  const finalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Blockless eLearning - Codelabs</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .header {
          background-color: #007bff;
          color: #fff;
          text-align: center;
          padding: 20px;
        }
        h1 {
          margin: 0;
        }
        ul {
          list-style: none;
          padding: 20px;
          margin: 0;
        }
        li {
          margin: 0;
          padding: 0;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Blockless eLearning - Codelabs</h1>
      </div>
      <ul>
        ${htmlContent}
      </ul>
    </body>
    </html>
  `;

  // Write the HTML content to a new file named 'index.html' in the './dist' directory
  const outputPath = path.join(distFolderPath, 'index.html');
  fs.writeFile(outputPath, finalHtml, (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      return;
    }

    console.log('HTML file generated and saved at:', outputPath);
  });
});
