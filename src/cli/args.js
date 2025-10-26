const parseArgs = () => {
  // args.js - implement function that parses command line arguments
  // (given in format '--propName value --prop2Name value2', you don't need to validate it)
  // and prints them to the console in the format 'propName is value, prop2Name is value2'

  const clArgs = process.argv;
  let str = '';

  for (let i = 3; i < clArgs.length; i += 2) {
    if (str) {
      str += ', ';
    }

    str += clArgs[i - 1] + ' is ' + clArgs[i];
  }

  console.log(str);
};

parseArgs();
