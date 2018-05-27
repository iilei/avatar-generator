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
});
