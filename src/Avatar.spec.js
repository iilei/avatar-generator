import { createCanvas } from 'canvas';
import config from './config';

describe('Avatar', () => {
  const canvas = createCanvas(200, 200);
  const options = {
    pastel: false,
    canvas,
  };

  it('should take SEED into account', () => {
    jest.resetModules();
    const { default: Avatar } = require('./Avatar');

    const avatar = new Avatar(options, config.SEED);
    const avatar1 = avatar();
    const avatar2 = avatar();
    const avatar3 = avatar();

    expect(avatar1.baseColor).toBe('#3ed5f1');
    expect(avatar2.baseColor).toBe('#f9a8f7');
    expect(avatar3.baseColor).toBe('#3ac4ef');
  });

  it('should respect option "pastel"', () => {
    jest.resetModules();
    const { default: Avatar } = require('./Avatar');

    const avatar = new Avatar({ ...options, pastel: true }, config.SEED);
    const avatar1 = avatar();
    const avatar2 = avatar();
    const avatar3 = avatar();

    expect(avatar1.baseColor).toBe('#78d0e5');
    expect(avatar2.baseColor).toBe('#eab1e9');
    expect(avatar3.baseColor).toBe('#68c1e4');
  });

  it('should respect option "sway"', () => {
    jest.resetModules();
    const { default: Avatar } = require('./Avatar');

    const avatar = new Avatar({
      ...options,
      sway: [
        [133, 133],
        [45, 45],
        [70, 70],
      ],
    }, (new Date()).getTime()); // to proof the point - rotating seed
    const avatar1 = avatar();

    expect(avatar1.baseColor).toBe('#7eb988');
  });

  describe('returned function', () => {
    it('should assign a random species"', () => {
      jest.resetModules();

      const { default: Avatar } = require('./Avatar');
      const avatar = new Avatar();
      expect(avatar('cat')).toEqual({ baseColor: '#3ed1d8', specimen: 'cat' });
    });

    it('should respect param "specimen"', () => {
      jest.resetModules();

      const { default: Avatar } = require('./Avatar');
      const avatar = new Avatar();
      expect(avatar()).toEqual({ baseColor: '#3ed5f1', specimen: 'human' });
      expect(avatar()).toEqual({ baseColor: '#f9a8f7', specimen: 'human' });
      expect(avatar()).toEqual({ baseColor: '#3ac4ef', specimen: 'cat' });
    });
  });
});
