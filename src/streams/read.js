import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const read = async () => {
  // read.js - implement function that reads file 'fileToRead.txt' content 
  // using Readable Stream and prints it's content into process.stdout
  
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const readableStream = fs.createReadStream(filePath);

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk + '\n');
  });
};

await read();
