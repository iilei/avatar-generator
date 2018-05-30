const SEED = 'me-is-seed.';
const PRECISION = 2;
const sway = [
  [0, 360], // Values in [0, 360] -- HSLuv.html#t:HPLuvHue
  [85, 95], // Values in [0, 100] -- HSLuv.html#t:HSLuvSaturation OR HSLuv.html#t:HPLuvPastel
  [70, 80], // Values in [0, 100] -- HSLuv.html#t:HSLuvLightness
];

const {
  default: config,
} = require.requireActual('../');

const mock = {
  ...config,
  SEED,
  PRECISION,
  sway,
};

export default mock;
