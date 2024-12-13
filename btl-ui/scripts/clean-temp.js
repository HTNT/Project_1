const fs = require("fs");
const path = require("path");

console.log('===== CLEAN TEMPORARY FILES ====');

// 1. Clean css file on src
const isCss = file => {
  const ext = file.split('.').pop();
  return ext === 'css';
};

// 2. Clean map file on src and public
const isMap = file => {
  const ext = file.split('.').pop();
  return ext === 'map';
};
// 3. Clean snap short file for test
const isSnap = file => {
  const ext = file.split('.').pop();
  return ext === 'snap';
};

const deleteFileRecursive = (rootPath, all) => {
  if (fs.existsSync(rootPath)) {
    fs.readdirSync(rootPath).forEach(file => {
      const curPath = path.join(rootPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFileRecursive(curPath, all);
      } else {
        // delete file
        if (isCss(file) || isMap(file) || isSnap(file) || all) {
          fs.unlinkSync(curPath);
        }
      }
    });
  }
};

// 4. Clean static file for build script
deleteFileRecursive(path.resolve('build'), true);

// 5. Call function delete file in src folder
deleteFileRecursive(path.resolve('src'));

// For debug
// process.exit(1);
