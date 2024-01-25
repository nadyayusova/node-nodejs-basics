import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const create = async () => {
  // create.js - implement function that creates new file 'fresh.txt'
  // with content 'I am fresh and young' inside of the 'files' folder 
  // (if file already exists Error with message 'FS operation failed' must be thrown)

  const newFileContent = 'I am fresh and young';
  const targetFile = path.join(__dirname, 'src', 'fs', 'files', 'fresh.txt');

  try {
    const stats = await fs
      .lstat(targetFile)
      .catch(() => {
        fs
          .writeFile(targetFile, newFileContent)
          .catch((err) => console.log(err.message));
      });
    if (stats) {
      try {
        throw new Error('FS operation failed');
      } catch (err) {
        console.error(err.message);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

await create();
