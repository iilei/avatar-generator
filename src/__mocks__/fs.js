const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = {};
function __setMockFiles(newMockFiles) {
  mockFiles = {};
  Object.entries(newMockFiles).forEach((entry) => {
    const [pfad, content] = entry;
    const dir = path.dirname(pfad);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(entry);
    mockFiles[pfad] = content;
  });
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function readFileSync(p) {
  return mockFiles[p] || '';
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;

module.exports = fs;
