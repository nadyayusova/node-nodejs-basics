import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'crypto';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  // calcHash.js - implement function that calculates SHA256 hash 
  // for file 'fileToCalculateHashFor.txt' and logs it into console as hex using Streams API

  const hash = crypto.createHash('sha256');
  const fd = await fs.open(filePath);
  const hashStream = fd.createReadStream();

  hashStream.on('data', (data) => {
    hash.update(data);
  });

  hashStream.on('error', () => {
    throw new Error('smth went wrong with hashing');
  });

  hashStream.on('end', () => {
    const hashHEX = hash.digest('hex');
    console.log(hashHEX);
  });
};

await calculateHash();
