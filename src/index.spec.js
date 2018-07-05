describe('index', () => {
  jest.mock('./Factory', () => jest.fn().mockImplementation(() => ({ toString: () => 'yolo' })));

  test('should proxy Factory export', () => {
    const Factory = require('./index').default;
    expect((new Factory()).toString()).toEqual('yolo');
  });
});
