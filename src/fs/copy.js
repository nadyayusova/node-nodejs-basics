import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const copy = async () => {
  // copy.js - implement function that copies folder 'files' files 
  // with all its content into folder 'files_copy' at the same level 
  // (if 'files' folder doesn't exists or 'files_copy' has already been created 
  // Error with message 'FS operation failed' must be thrown)

  const fromDir = path.join(__dirname, 'src', 'fs', 'files');
  const toDir = path.join(__dirname, 'src', 'fs', 'files_copy');

  async function getFiles(dir) {
    const dirContent = await fs.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
      dirContent.map((item) => {
        const res = path.join(dir, item.name);

        return item.isDirectory() ? getFiles(res) : res;
      }),
    );

    return files.flat();
  }

  try {
    const statsFrom = new Promise((resolve, reject) => {
      fs.lstat(fromDir).then(() => resolve()).catch(() => reject());
    });

    const statsTo = new Promise((resolve, reject) => {
      fs.lstat(toDir).then(() => resolve()).catch(() => reject());
    });

    const promises = [statsFrom, statsTo];

    Promise
      .allSettled(promises)
      .then((results) => {
        if (results[0].status === 'fulfilled' && results[1].status === 'rejected') {

          fs
            .mkdir(toDir, { recursive: true })
            .then(() => getFiles(fromDir))
            .then((files) => {
              files.forEach((file) => {
                const copyFullPath = file.replace(`${fromDir}`, `${toDir}`);

                fs
                  .mkdir(path.parse(copyFullPath).dir, { recursive: true })
                  .then(() => fs.copyFile(file, copyFullPath))
                  .catch((err) => console.log(err.message));
              });
            });

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

await copy();
