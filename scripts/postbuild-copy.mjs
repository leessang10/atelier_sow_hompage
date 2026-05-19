import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const standaloneDir = join('.next', 'standalone');
const standaloneNextDir = join(standaloneDir, '.next');
const standalonePublicDir = join(standaloneDir, 'public');

mkdirSync(standaloneNextDir, { recursive: true });
mkdirSync(standalonePublicDir, { recursive: true });

cpSync(join('.next', 'static'), join(standaloneNextDir, 'static'), { recursive: true });

if (existsSync(join('.next', 'server', 'vendor-chunks'))) {
  cpSync(join('.next', 'server', 'vendor-chunks'), join(standaloneNextDir, 'server', 'vendor-chunks'), { recursive: true });
}

if (existsSync('public')) {
  cpSync('public', standalonePublicDir, { recursive: true });
}
