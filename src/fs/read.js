import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const read = async () => {
  // read.js - implement function that prints content of the 'fileToRead.txt'
  // into console (if there's no file 'fileToRead.txt'
  // Error with message 'FS operation failed' must be thrown)

  const targetFile = path.join(__dirname, 'src', 'fs', 'files', 'fileToRead.txt');

  fs
    .readFile(targetFile, 'utf-8')
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      throw new Error('FS operation failed');
    })
    .catch((err) => {
      console.error(err.message);
    });
};

await read();
