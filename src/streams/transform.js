import { Transform } from 'node:stream';

const transform = async () => {
  // transform.js - implement function that reads data from process.stdin, 
  // reverses text using Transform Stream and then writes it into process.stdout
  
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split('').reverse().join('');
      this.push(reversedText + '\n');
      callback();
    },
  });

  reverseTransform.on('error', (error) => {
    console.log(`Error when trnasform: ${error}`);
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
