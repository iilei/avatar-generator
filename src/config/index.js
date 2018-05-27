/* eslint-disable no-magic-numbers */
const sway = [
  [0, 360], // Values in [0, 360] -- HSLuv.html#t:HPLuvHue
  [85, 95], // Values in [0, 100] -- HSLuv.html#t:HSLuvSaturation OR HSLuv.html#t:HPLuvPastel
  [70, 80], // Values in [0, 100] -- HSLuv.html#t:HSLuvLightness
];

const defaults = {
  w: 120,
  h: 120,
  sway,
  pastel: false,
};
/* eslint-enable no-magic-numbers */

export default {
  ...defaults,
};
