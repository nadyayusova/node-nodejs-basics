import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const decompress = async () => {
  // decompress.js - implement function that decompresses 'archive.gz' 
  // back to the 'fileToCompress.txt' with same content as before compression 
  // using zlib and Streams API

  const readPath = path.resolve(__dirname, 'files', 'archive.gz');
  const writePath = path.resolve(__dirname, 'files', 'fileToCompress1.txt');

  if (!fs.existsSync(readPath)) {
    throw Error(`Not found: ${readPath}`);
  }

  const unZip = zlib.createUnzip();

  const readStream = fs.createReadStream(readPath);
  const writeStream = fs.createWriteStream(writePath);

  readStream.pipe(unZip).pipe(writeStream);
};

await decompress();
