const SEED = 'me-is-seed.';
const PRECISION = 2;

const {
  default: config,
} = require.requireActual('../');

const mock = {
  ...config,
  SEED,
  PRECISION,
};

export default mock;
