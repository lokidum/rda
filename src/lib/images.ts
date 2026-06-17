import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.cwd(), 'public/images');

/**
 * Build-time check: does a real photo exist for this slot yet?
 * When false, the branded placeholder frame renders instead. Drop a file with
 * the exact name into public/images/ and the real photo takes over, no code
 * change needed.
 */
export function hasImage(file: string): boolean {
  try {
    return fs.existsSync(path.join(dir, file));
  } catch {
    return false;
  }
}
