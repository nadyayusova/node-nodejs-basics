import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const write = async () => {
  // write.js - implement function that writes process.stdin data 
  // into file 'fileToWrite.txt' content using Writable Stream
  
  const filePath = path.resolve(__dirname, 'files', 'fileToWrite.txt');

  const writableStream = fs.createWriteStream(filePath);

  console.log('Start writing text and hit "Enter":');

  process.stdin.on('data', (chunk) => {
    writableStream.write(chunk);
  });
};

await write();
