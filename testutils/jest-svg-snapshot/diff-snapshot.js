import XMLDifferenceChecker from 'jest-xml-matcher/src/xml-difference-checker';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const ENCODING = 'utf-8';

const isFailure = ({ pass, updateSnapshot }) => !pass && !updateSnapshot;

const shouldUpdate = ({ pass, updateSnapshot, updatePassedSnapshot }) => (
  (!pass && updateSnapshot) || (pass && updatePassedSnapshot)
);

function diffSvgToSnapshot(options) {
  const {
    receivedSvg,
    snapshotIdentifier,
    snapshotsDir,
    updateSnapshot = false,
    updatePassedSnapshot = false,
  } = options;

  let result = {};
  const baselineSnapshotPath = path.join(snapshotsDir, `${snapshotIdentifier}-snap.svg`);
  if (!fs.existsSync(baselineSnapshotPath)) {
    mkdirp.sync(snapshotsDir);
    fs.writeFileSync(baselineSnapshotPath, receivedSvg, ENCODING);
    result = { added: true };
  } else {
    const baselineSvg = fs.readFileSync(baselineSnapshotPath, ENCODING);
    const pass = (receivedSvg === baselineSvg);
    const baselineSvgStr = baselineSvg.trim();
    const receivedSvgStr = receivedSvg.trim();

    if (isFailure({ pass, updateSnapshot })) {
      result = {
        pass: false,
        diff: new XMLDifferenceChecker(baselineSvgStr, receivedSvgStr).formattedDifferences,
      };
    } else if (shouldUpdate({ pass, updateSnapshot, updatePassedSnapshot })) {
      mkdirp.sync(snapshotsDir);
      fs.writeFileSync(baselineSnapshotPath, receivedSvg);
      result = { updated: true };
    } else {
      result = {
        pass: true,
      };
    }
  }
  return result;
}

module.exports = {
  diffSvgToSnapshot,
};
