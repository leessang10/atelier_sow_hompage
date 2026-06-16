import fs from 'fs';
import path from 'path';

describe('home archive source', () => {
  it('does not include a stray Korean identifier in the bounds literal', () => {
    const file = fs.readFileSync(path.join(process.cwd(), 'widgets/home-archive/ui/home-archive.tsx'), 'utf8');

    expect(file).toContain('bottom: 260,');
    expect(file).not.toContain('bottom: 260,결');
  });
});
