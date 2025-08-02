import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const outDir = join(process.cwd(), 'public', 'rawart');
mkdirSync(outDir, { recursive: true });

// Placeholder 1x1 transparent PNG encoded in base64
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/woAAgEB/abeLpsAAAAASUVORK5CYII=';

writeFileSync(join(outDir, 'background.png'), Buffer.from(pngBase64, 'base64'));
