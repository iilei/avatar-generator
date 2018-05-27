import { createCanvas } from 'canvas';
import config from './config';

describe('AvatarFactory', () => {
  const canvas = createCanvas(200, 200);
  const options = {
    pastel: false,
    canvas,
  };

  it('should take SEED into account', () => {
    jest.resetModules();
    const { default: AvatarFactory } = require('./AvatarFactory');

    const avatarFactory = new AvatarFactory(options, config.SEED);
    const avatar1 = avatarFactory.generate();
    const avatar2 = avatarFactory.generate();
    const avatar3 = avatarFactory.generate();

    expect(avatar1.baseColor).toBe('#3ed1d8');
    expect(avatar2.baseColor).toBe('#f3aafa');
    expect(avatar3.baseColor).toBe('#30c9cd');
  });

  it('should respect option "pastel"', () => {
    jest.resetModules();
    const { default: AvatarFactory } = require('./AvatarFactory');

    const avatarFactory = new AvatarFactory({ ...options, pastel: true }, config.SEED);
    const avatar1 = avatarFactory.generate();
    const avatar2 = avatarFactory.generate();
    const avatar3 = avatarFactory.generate();

    expect(avatar1.baseColor).toBe('#52d0d6');
    expect(avatar2.baseColor).toBe('#e7b2ec');
    expect(avatar3.baseColor).toBe('#34c9cd');
  });

  it('should respect option "sway"', () => {
    jest.resetModules();
    const { default: AvatarFactory } = require('./AvatarFactory');

    const avatarFactory = new AvatarFactory({
      ...options,
      sway: [
        [290, 290],
        [95, 95],
        [70, 70],
      ],
    }, Math.random());
    const avatar1 = avatarFactory.generate();

    expect(avatar1.baseColor).toBe('#d48ffb');
  });
});
