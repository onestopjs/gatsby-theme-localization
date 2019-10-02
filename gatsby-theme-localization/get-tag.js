// This is used to determine the relase flag for the CI

const fs = require('fs');
const path = require('path');
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));
const {version} = packageJson;
const result = version.match(/^\d*\.\d*\.\d*-(\w*)\.\d*$/);
const tag = !!result ? result[1] : 'latest';
console.log(tag)
