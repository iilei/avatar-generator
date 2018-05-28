import _round from 'lodash.round';

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
const { PRECISION: precision } = defaults;

const defaultOptions = {
  ratio: GOLDEN_RATIO,
  segments: 0,
  precision,
};

function segmentation(matrix, opts = {}) {
  const { segments, ratio, precision: PRECISION } = { ...defaultOptions, ...opts };

  if (matrix.length > segments && segments > 0) {
    return matrix;
  }

  const value = _round(matrix[1] * ratio, PRECISION);
  if (matrix[1] === value) {
    return matrix;
  }

  const newVector = [matrix[0], value, ...matrix.slice(1)];
  return (segmentation(newVector, { segments }));
}

export default segmentation;
