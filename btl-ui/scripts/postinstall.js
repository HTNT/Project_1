const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const env = process.env.NODE_ENV || 'development';

console.log('======= POST INSTALL =======');
console.log('== env: ', env);

const doOverwriteWebpackConfig = async () => {
  const wpFile = path.resolve('webpackDevServer.config.js');
  const wpNode = path.resolve('node_modules', 'react-scripts', 'config', 'webpackDevServer.config.js');

  fs.copyFileSync(wpFile, wpNode);
}

if (env === 'development') {
  setTimeout(async () => {
    await doOverwriteWebpackConfig();
  }, 0);
}
