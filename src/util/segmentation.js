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
const { PRECISION } = defaults;

function segmentation(vector, iterations = 0) {
  if (vector.length > iterations + 1 || vector.length < 2) {
    return vector;
  }
  const value = _round(vector[1] * GOLDEN_RATIO, PRECISION);
  if (vector[1] === value) {
    return vector;
  }

  const newVector = [vector[0], value, ...vector.slice(1)];
  return (segmentation(newVector, iterations));
}

export default segmentation;
