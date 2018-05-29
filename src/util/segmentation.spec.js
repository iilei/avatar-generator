import Segmentation from './segmentation';

describe('Class Segmentation', () => {
  it('instantiating it returns a function', () => {
    const segmentation = new Segmentation();
    expect(segmentation).toBeFunction();
  });

  describe('returned function', () => {
    it('generating a harmonic grid', () => {
      const segmentation = new Segmentation();
      expect(segmentation([0, 100]))
        // eslint-disable-next-line max-len
        .toEqual([0, 0.01, 0.02, 0.04, 0.07, 0.12, 0.2, 0.32, 0.51, 0.82, 1.32, 2.13, 3.44, 5.57, 9.02, 14.59, 23.61, 38.2, 61.8, 76.39, 85.41, 90.98, 94.43, 96.56, 97.87, 98.68, 99.18, 99.49, 99.68, 99.8, 99.88, 99.93, 99.96, 99.98, 99.99, 100]);
    });

    it('stops iterating when the smallest possible value is reached', () => {
      const segmentation = new Segmentation({ ratio: 0.5, segments: 50 });
      expect(segmentation([0, 10]))
        // eslint-disable-next-line max-len
        .toEqual([0, 0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.63, 1.25, 2.5, 5, 7.5, 8.75, 9.37, 9.68, 9.84, 9.92, 9.96, 9.98, 9.99, 10]);
    });

    it('takes maximum number of segments into account', () => {
      const segmentation = new Segmentation({ segments: 5 });
      expect(segmentation([0, 500]))
        .toEqual([0, 118.03, 190.98, 309.02, 381.97, 500]);
    });

    it('takes ratio into account', () => {
      const segmentation = new Segmentation({ ratio: 0.2 });
      expect(segmentation([0, 10]))
        .toEqual([
          0, 0.02, 0.08, 0.4, 2, 8, 9.6, 9.92, 9.98, 10,
        ]);
    });

    it('takes offset into account', () => {
      const segmentation = new Segmentation({ ratio: 0.225 });
      expect(segmentation([10, 20]))
        .toEqual([
          // eslint-disable-next-line max-len
          10, 10.02, 10.11, 10.51, 12.25, 17.75, 19.49, 19.89, 19.98, 20,
        ]);
    });

    it('takes precision into account', () => {
      const segmentation = new Segmentation({ ratio: 0.5, precision: 1 });
      expect(segmentation([10, 20]))
        .toEqual([
          10, 10.1, 10.2, 10.4, 10.7, 11.3, 12.5, 15, 17.5, 18.7, 19.3, 19.6, 19.8, 19.9, 20,
        ]);
    });
  });
});
