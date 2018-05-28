import _uniq from 'lodash.uniq';

import defaults from '../config';
/*
The harmonic grid is based on the golden ratio, roughly 1:0.618
For both axis, iterate N times over it and divide it accordingly
this is done left to right, right to left, top to bottom and
bottom to to.

roughly:
 -------|-------------|------------------|------------|--------
\- A -----------------/                  \--------------------`A
\- B ---/                                             \-------`B

 */
const GOLDEN_RATIO = 0.618033;
const STEPS_UNLIMITED = -1;
const { PRECISION } = defaults;

function segmentation(
  matrix,
  ratio = GOLDEN_RATIO,
  segments = STEPS_UNLIMITED,
) {
  if (matrix.length > segments && segments > 0) {
    return matrix;
  }

  const value = Math.round(((matrix[1] - matrix[0]) * ratio) + matrix[0]);
  const mirror = (matrix[matrix.length - 1] - value) + matrix[0];

  if (matrix[1] === value || matrix[0] === value) {
    return matrix;
  }

  const lastIndex = matrix.length - 1;

  const newVector = [
    matrix[0],
    Math.min(value, mirror),
    ...matrix.slice(1, lastIndex),
    Math.max(value, mirror),
    matrix[lastIndex],
  ];

  return (segmentation(_uniq(newVector), ratio, segments));
}

export { GOLDEN_RATIO, STEPS_UNLIMITED, PRECISION };
export default segmentation;
