import segmentation from './segmentation';

describe('segmentation Function', () => {
  it('returns harmonic grid', () => {
    expect(segmentation([0, 100]))
      // eslint-disable-next-line max-len
      .toEqual([0, 0.01, 0.02, 0.04, 0.07, 0.12, 0.2, 0.32, 0.51, 0.82, 1.32, 2.13, 3.44, 5.57, 9.02, 14.59, 23.6, 38.19, 61.8, 100]);
  });

  it('returns harmonic grid', () => {
    expect(segmentation([0, 100]).slice(-3))
      .toEqual([38.19, 61.8, 100]);
  });

  it('stops iterating when the smallest possible value is reached', () => {
    expect(segmentation([0, 0.5], { segments: 9 }))
      .toEqual([0, 0.01, 0.02, 0.04, 0.07, 0.12, 0.19, 0.31, 0.5]);
  });

  it('takes maximum number of segments into account', () => {
    expect(segmentation([0, 0.5], { segments: 5 }))
      .toEqual([0, 0.07, 0.12, 0.19, 0.31, 0.5]);
  });

  it('takes ratio into account', () => {
    expect(segmentation([0, 10], { ratio: 0.75, segments: 20 }))
      .toEqual([
        0, 0.01, 0.02, 0.04, 0.06, 0.09, 0.15, 0.25, 0.41, 0.67, 1.09, 1.77, 2.87, 4.64, 7.5, 10,
      ]);
  });
});
