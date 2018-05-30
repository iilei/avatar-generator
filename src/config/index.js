import creatures from './creatures';
/* eslint-disable no-magic-numbers */
const PRECISION = 3;

const sway = [
  [0, 360], // Values in [0, 360] -- HSLuv.html#t:HPLuvHue
  [15, 100], // Values in [0, 100] -- HSLuv.html#t:HSLuvSaturation OR HSLuv.html#t:HPLuvPastel
  [15, 100], // Values in [0, 100] -- HSLuv.html#t:HSLuvLightness
];

const defaults = {
  w: 120,
  h: 120,
  sway,
  pastel: false,
  PRECISION,
  creatures,
};
/* eslint-enable no-magic-numbers */

export default {
  ...defaults,
};
