import Segmentation from './segmentation';

describe('segmentation Function', () => {
  it('returns harmonic grid', () => {
    const segmentation = new Segmentation();
    expect(segmentation([0, 100]))
      // eslint-disable-next-line max-len
      .toEqual([0, 1, 2, 4, 6, 9, 14, 23, 38, 62, 77, 86, 91, 94, 96, 98, 99, 100]);
  });

  it('stops iterating when the smallest possible value is reached', () => {
    const segmentation = new Segmentation({ ratio: 0.5, segments: 9 });
    expect(segmentation([0, 10]))
      .toEqual([0, 1, 2, 3, 5, 7, 8, 9, 10]);
  });

  it('takes maximum number of segments into account', () => {
    const segmentation = new Segmentation({ segments: 5 });
    expect(segmentation([0, 500]))
      .toEqual([0, 118, 191, 309, 382, 500]);
  });

  it('takes ratio into account', () => {
    const segmentation = new Segmentation({ ratio: 0.2 });
    expect(segmentation([0, 10]))
      .toEqual([
        0, 2, 8, 10,
      ]);
  });

  it('takes offset into account', () => {
    const segmentation = new Segmentation({ ratio: 0.6 });
    expect(segmentation([10, 20]))
      .toEqual([
        10, 11, 12, 14, 16, 18, 19, 20,
      ]);
  });
});
