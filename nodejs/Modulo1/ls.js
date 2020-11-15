const fs = require('fs');
const util = require('util');
const fs_readdir = util.promisify(fs.readdir);

(async () => {
  const files = await fs_readdir('.');
  for (let f of files) {
    console.log(`-${f}`);
  }
})().catch(err => { console.error(err); });