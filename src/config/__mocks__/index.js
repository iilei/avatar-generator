const SEED = 'me-is-seed.';

const {
  default: config,
} = require.requireActual('../');

const mock = {
  SEED,
  ...config,
};

export default mock;
