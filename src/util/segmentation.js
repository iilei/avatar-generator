import _uniq from 'lodash.uniq';
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
const STEPS_UNLIMITED = -1;
const { PRECISION: precision } = defaults;

class Segmentation {
  constructor(opts) {
    this.opts = {
      ratio: GOLDEN_RATIO,
      segments: STEPS_UNLIMITED,
      precision,
      ...opts,
    };

    this.segmentation = this.segmentation.bind(this);
    return this.segmentation;
  }

  segmentation(arr) {
    if (arr.length > this.opts.segments && this.opts.segments > 0) {
      return _uniq(arr);
    }

    const lastIndex = arr.length - 1;

    const value = _round((((arr[1] - arr[0]) * this.opts.ratio) + arr[0]), this.opts.precision);
    const mirror = _round(((arr[lastIndex] - value) + arr[0]), this.opts.precision);

    if (arr[1] === value || arr[0] === value) {
      return _uniq(arr);
    }

    const newVector = [
      arr[0],
      Math.min(value, mirror),
      ...arr.slice(1, lastIndex),
      Math.max(value, mirror),
      arr[lastIndex],
    ];

    return (this.segmentation(newVector));
  }
}

export default Segmentation;
