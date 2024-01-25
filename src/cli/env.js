const parseEnv = () => {
  // env.js - implement function that parses environment variables 
  // with prefix 'RSS_' and prints them to the console
  // in the format 'RSS_name1 = value1; RSS_name2 = value2'

  const envVars = process.env;

  const filtered = Object.keys(envVars)
    .filter(key => key.startsWith('RSS_'))
    .reduce((str, key) => {
      if (str) {
        str += '; ';
      }

      str += key + ' = ' + envVars[key];

      return str;
    }, '');

  console.log(filtered);
};

parseEnv();
