const fs = require('fs');
const path = require('path');
const { validateData } = require('../validators/validateData');
const { countScenarios } = require('../../utilities/countScenarios');

const readScenario = (fileName, dirName) => {
  // explicitly ignore c0000000023o as it's a example of invalid data
  if (fileName.includes('c0000000023o.json')) {
    return false;
  }

  if (path.extname(fileName) !== '.json') {
    return false;
  }

  countScenarios();

  return new Promise(resolve => {
    resolve(module.exports.fileToValidate(`${dirName}/${fileName}`));
  });
};

const fileToValidate = fileName => {
  const data = fs.readFileSync(fileName);
  validateData(JSON.parse(data));
};

module.exports = { readScenario, fileToValidate };
