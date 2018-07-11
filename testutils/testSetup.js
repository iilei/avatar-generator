// https://stackoverflow.com/questions/47587689/whats-the-difference-between-setupfiles-and-setuptestframeworkscriptfile
import 'jest-extended';

import { toMatchSvgSnapshot } from './jest-svg-snapshot';

expect.extend({ toMatchSvgSnapshot });
