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
  iterations: 0,
  precision,
};

function segmentation(vector, opts = {}) {
  const { iterations, ratio, precision: PRECISION } = { ...defaultOptions, ...opts };

  if (vector.length > iterations + 1 || vector.length < 2) {
    return vector;
  }

  const value = _round(vector[1] * ratio, PRECISION);
  if (vector[1] === value) {
    return vector;
  }

  const newVector = [vector[0], value, ...vector.slice(1)];
  return (segmentation(newVector, { iterations }));
}

export default segmentation;
