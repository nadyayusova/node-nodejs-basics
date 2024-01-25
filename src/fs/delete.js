import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const remove = async () => {
  //  delete.js - implement function that deletes file 'fileToRemove.txt'
  // (if there's no file 'fileToRemove.txt' Error with message
  // 'FS operation failed' must be thrown)

  const targetFile = path.join(__dirname, 'src', 'fs', 'files', 'fileToRemove.txt');

  fs
    .lstat(targetFile)
    .then(() => {
      fs.rm(targetFile);
    })
    .catch(() => {
      throw new Error('FS operation failed');
    })
    .catch((err) => {
      console.error(err.message);
    });
};

await remove();
