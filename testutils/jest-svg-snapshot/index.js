const kebabCase = require('lodash/kebabCase');
const merge = require('lodash/merge');
const path = require('path');
const Chalk = require('chalk').constructor;
const { diffSvgToSnapshot } = require('./diff-snapshot');
const fs = require('fs');

const SNAPSHOTS_DIR = '__svg_snapshots__';

function updateSnapshotState(originalSnapshotState, partialSnapshotState) {
  if (global.UNSTABLE_SKIP_REPORTING) {
    return originalSnapshotState;
  }
  return merge(originalSnapshotState, partialSnapshotState);
}

function configureToMatchSvgSnapshot({
  customDiffConfig: commonCustomDiffConfig = {},
  customSnapshotsDir: commonCustomSnapshotsDir,
  noColors: commonNoColors = false,
  failureThreshold: commonFailureThreshold = 0,
  failureThresholdType: commonFailureThresholdType = 'pixel',
  updatePassedSnapshot: commonUpdatePassedSnapshot = false,
} = {}) {
  return function toMatchSvgSnapshot(received, {
    customSnapshotIdentifier = '',
    customSnapshotsDir = commonCustomSnapshotsDir,
    customDiffConfig = {},
    noColors = commonNoColors,
    failureThreshold = commonFailureThreshold,
    failureThresholdType = commonFailureThresholdType,
    updatePassedSnapshot = commonUpdatePassedSnapshot,
  } = {}) {
    const {
      testPath, currentTestName, isNot, snapshotState,
    } = this;
    const chalk = new Chalk({ enabled: !noColors });

    if (isNot) { throw new Error('Jest: `.not` cannot be used with `.toMatchSvgSnapshot()`.'); }

    updateSnapshotState(snapshotState, { _counters: snapshotState._counters.set(currentTestName, (snapshotState._counters.get(currentTestName) || 0) + 1) }); // eslint-disable-line max-len
    const snapshotIdentifier = customSnapshotIdentifier || kebabCase(`${path.basename(testPath)}-${currentTestName}-${snapshotState._counters.get(currentTestName)}`);

    const snapshotsDir = customSnapshotsDir || path.join(path.dirname(testPath), SNAPSHOTS_DIR);
    const baselineSnapshotPath = path.join(snapshotsDir, `${snapshotIdentifier}-snap.png`);

    if (snapshotState._updateSnapshot === 'none' && !fs.existsSync(baselineSnapshotPath)) {
      return {
        pass: false,
        message: () => `New snapshot was ${chalk.bold.red('not written')}. The update flag must be explicitly ` +
        'passed to write a new snapshot.\n\n + This is likely because this test is run in a continuous ' +
        'integration (CI) environment in which snapshots are not written by default.\n\n',
      };
    }

    const result =
      diffSvgToSnapshot({
        receivedSvg: received,
        snapshotsDir,
        snapshotIdentifier,
        updateSnapshot: snapshotState._updateSnapshot === 'all',
        customDiffConfig: Object.assign({}, commonCustomDiffConfig, customDiffConfig),
        failureThreshold,
        failureThresholdType,
        updatePassedSnapshot,
      });

    let pass = true;
    /*
      istanbul ignore next
      `message` is implementation detail. Actual behavior is tested in integration.spec.js
    */
    let message = () => '';

    if (result.updated) {
      // once transition away from jasmine is done this will be a lot more elegant and pure
      // https://github.com/facebook/jest/pull/3668
      updateSnapshotState(snapshotState, { updated: snapshotState.updated + 1 });
    } else if (result.added) {
      updateSnapshotState(snapshotState, { added: snapshotState.added + 1 });
    } else {
      ({ pass } = result);

      if (!pass) {
        updateSnapshotState(snapshotState, { unmatched: snapshotState.unmatched + 1 });
        message = () => `SVG Snapshot diff:\n${result.diff}`;
      }
    }

    return {
      message,
      pass,
    };
  };
}

const toMatchSvgSnapshot = configureToMatchSvgSnapshot();

export {
  toMatchSvgSnapshot,
  configureToMatchSvgSnapshot,
  updateSnapshotState,
};
