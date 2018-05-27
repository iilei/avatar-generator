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
});
