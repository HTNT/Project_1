const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
console.log('====== CHECK ENV REQUIRED ======');

let needCopyEnvironment = false;
const envRequired = ['PORT', 'NODE_ENV', 'REACT_APP_ROOT', 'REACT_APP_API_URL', 'REACT_APP_GOOGLE_ANALYTICS'];

const doCopyEnvironment = () => {
  const cpFile = path.resolve('.env.copy');
  const toFile = path.resolve('.env');

  fs.copyFileSync(cpFile, toFile);
}

for (let i = 0; i < envRequired.length; i++) {
  const evName = envRequired[i];
  const eValue = process.env[evName];

  if (!eValue || eValue.toString().length === 0) {
    console.warn('The "' + evName + '" is required.');
    needCopyEnvironment = true;
  }
}

if (needCopyEnvironment) {
  console.warn('The default environment to be overwrite into .env !');
  doCopyEnvironment();
}
