import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const cityBlock = html.match(/const CITY_IMAGES = \{([\s\S]*?)\n\};/);
const routeBlock = [...html.matchAll(/\{id:'([^']+)',name:'([^']+)',banner:'(https:\/\/[^']+)'/g)];
const routePoolBlock = html.match(/const ROUTE_BANNERS = \{([\s\S]*?)\n\};/);

if (!cityBlock || !routePoolBlock) {
  throw new Error('Failed to parse image blocks from index.html');
}

const cityImages = [...cityBlock[1].matchAll(/'([^']+)':'(https:\/\/[^']+)'/g)].map(match => ({
  type: 'city',
  key: match[1],
  url: match[2],
}));

const routeImages = routeBlock.map(match => ({
  type: 'route',
  key: `${match[1]} ${match[2]}`,
  url: match[3],
}));

const poolImages = [...routePoolBlock[1].matchAll(/'(https:\/\/[^']+)'/g)].map((match, index) => ({
  type: 'pool',
  key: `pool-${index + 1}`,
  url: match[1],
}));

const assets = [...cityImages, ...routeImages, ...poolImages];

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return response.status;
  } catch {
    return 'ERR';
  }
}

const failures = [];
for (const asset of assets) {
  const status = await checkUrl(asset.url);
  const line = `${asset.type}\t${asset.key}\t${status}\t${asset.url}`;
  console.log(line);
  if (status !== 200) failures.push(line);
}

if (failures.length > 0) {
  console.error('\nBroken assets found:\n' + failures.join('\n'));
  process.exit(1);
}

console.log('\nAll checked static assets returned 200.');
