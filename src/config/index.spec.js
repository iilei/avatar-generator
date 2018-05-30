const {
  default: config,
} = require.requireActual('./');

describe('config', () => {
  it('should export properly', () => {
    expect(config).toBeDefined();
  });

  it('does not export "SEED" as it spoils the precious randomness', () => {
    expect(config.SEED).not.toBeDefined();
  });

  it('exports creature configurations', () => {
    expect(config.creatures).toContainAllKeys(['cat', 'human']);
  });

  it('exports sway configurations', () => {
    expect(config.sway).toEqual([
      [0, 360], // Values in [0, 360] -- HSLuv.html#t:HPLuvHue
      [15, 100], // Values in [0, 100] -- HSLuv.html#t:HSLuvSaturation OR HSLuv.html#t:HPLuvPastel
      [15, 100], // Values in [0, 100] -- HSLuv.html#t:HSLuvLightness
    ]);
  });
});
