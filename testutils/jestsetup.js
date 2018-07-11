// https://stackoverflow.com/questions/47587689/whats-the-difference-between-setupfiles-and-setuptestframeworkscriptfile
import path from 'path';

jest.mock(path.resolve(__dirname, '../src/config'));
