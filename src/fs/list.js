import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const list = async () => {
  // list.js - implement function that prints all array of filenames from 'files' folder
  // into console (if 'files' folder doesn't exists
  // Error with message 'FS operation failed' must be thrown)

  const targetDir = path.join(__dirname, 'src', 'fs', 'files');

  fs
    .lstat(targetDir)
    .then(() => {
      fs
        .readdir(targetDir)
        .then((files) => {
          files.forEach((file) => {
            const filePath = path.join(targetDir, file);

            fs
              .lstat(filePath)
              .then((stat) => {
                if (stat.isFile() || stat.isDirectory()) {
                  console.log(file);
                }
              });
          });
        })
    })
    .catch(() => {
      throw new Error('FS operation failed');
    })
    .catch((err) => {
      console.error(err.message);
    });
};

await list();
