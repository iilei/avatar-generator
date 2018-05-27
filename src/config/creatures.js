import fs from 'fs';
import path from 'path';
import ini from 'configurable-ini';
import parameterize from 'parameterize';
import globby from 'globby';

const creatureGlob = `${path.resolve(__dirname, './creatures')}/**.{ini,cdl}`;

const creatures = globby.sync(creatureGlob).map((p) => {
  const cfg = ini.parse(fs.readFileSync(p, 'utf-8'));
  const extension = path.extname(p);
  const name = parameterize(path.basename(p, extension));
  return ({
    [name]: cfg,
  });
});

export default Object.assign({}, ...creatures);
