import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compress = async () => {
  // compress.js - implement function that compresses file 'fileToCompress.txt' 
  // to 'archive.gz' using zlib and Streams API

  const readPath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
  const writePath = path.resolve(__dirname, 'files', 'archive.gz');

  const gZip = zlib.createGzip();

  const readStream = fs.createReadStream(readPath);
  const writeStream = fs.createWriteStream(writePath);

  readStream.pipe(gZip).pipe(writeStream);
};

await compress();
