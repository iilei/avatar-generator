import SVG from '.';

describe('SVG', () => {
  it('should export properly', () => {
    expect(SVG).toBeDefined();
  });

  it('should do properly', () => {
    const instance = new SVG();
    expect(instance.toString()).toMatchSvgSnapshot();
  });
});
