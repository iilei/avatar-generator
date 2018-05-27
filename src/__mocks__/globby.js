const globby = jest.genMockFromModule('globby');
const sync = jest.fn();
sync.mockReturnValue(['cat.ini', 'human.ini']);

globby.sync = sync;

export default globby;
