import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const rename = async () => {
  // rename.js - implement function that renames file 'wrongFilename.txt'
  // to 'properFilename' with extension '.md'
  // (if there's no file 'wrongFilename.txt' or 'properFilename.md' already exists
  //  Error with message 'FS operation failed' must be thrown)

  const fromFile = path.join(__dirname, 'src', 'fs', 'files', 'wrongFilename.txt');
  const toFile = path.join(__dirname, 'src', 'fs', 'files', 'properFilename.md');

  try {
    const statsFrom = new Promise((resolve, reject) => {
      fs.lstat(fromFile).then(() => resolve()).catch(() => reject());
    });

    const statsTo = new Promise((resolve, reject) => {
      fs.lstat(toFile).then(() => resolve()).catch(() => reject());
    });

    const promises = [statsFrom, statsTo];

    Promise
      .allSettled(promises)
      .then((results) => {
        if (results[0].status === 'fulfilled' && results[1].status === 'rejected') {
          fs.rename(fromFile, toFile);
        } else {
          throw new Error('FS operation failed');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  } catch (err) {
    console.error(err.message);
  }
};

await rename();
