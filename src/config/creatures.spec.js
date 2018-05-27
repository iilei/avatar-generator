describe('creatures', () => {
  let creatures;

  const MOCK_FILE_INFO = {
    'cat.ini': '',
    'human.ini': '',
  };

  beforeEach(() => {
    jest.resetModules();
    // Set up some mocked out file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
    creatures = require('./creatures').default;
  });

  it('should export properly', () => {
    expect(creatures).toEqual({ cat: {}, human: {} });
  });
});
