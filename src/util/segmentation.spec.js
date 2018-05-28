import segmentation, { GOLDEN_RATIO } from './segmentation';

describe('segmentation Function', () => {
  it('returns harmonic grid', () => {
    expect(segmentation([0, 100], GOLDEN_RATIO))
      // eslint-disable-next-line max-len
      .toEqual([0, 1, 2, 4, 6, 9, 14, 23, 38, 62, 77, 86, 91, 94, 96, 98, 99, 100]);
  });

  it('stops iterating when the smallest possible value is reached', () => {
    expect(segmentation([0, 10], 0.5, 9))
      .toEqual([0, 1, 2, 3, 5, 7, 8, 9, 10]);
  });

  it('takes maximum number of segments into account', () => {
    expect(segmentation([0, 500], GOLDEN_RATIO, 5))
      .toEqual([0, 118, 191, 309, 382, 500]);
  });

  it('takes ratio into account', () => {
    expect(segmentation([0, 10], 0.2))
      .toEqual([
        0, 2, 8, 10,
      ]);
  });

  it('takes offset into account', () => {
    expect(segmentation([10, 20], 0.6))
      .toEqual([
        10, 11, 12, 14, 16, 18, 19, 20,
      ]);
  });
});
