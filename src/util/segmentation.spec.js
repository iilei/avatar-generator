import segmentation from './segmentation';

describe('segmentation Function', () => {
  it('returns harmonic grid', () => {
    expect(segmentation([0, 100], 5)).toEqual([0, 9.02, 14.59, 23.6, 38.19, 61.8, 100]);
  });

  it('stops iterating when the smallest possible value is reached', () => {
    expect(segmentation([0, 0.5], 10)).toEqual([0, 0.01, 0.02, 0.04, 0.07, 0.12, 0.19, 0.31, 0.5]);
  });

  it('takes maximum number of iterations into account', () => {
    expect(segmentation([0, 0.5], 6)).toEqual([0, 0.02, 0.04, 0.07, 0.12, 0.19, 0.31, 0.5]);
  });
});
