import { chmod, chown, lstat, mkdir, symlink, writeFile } from 'fs';
import { promisify } from 'util';

export const chmodAsync = promisify(chmod);
export const chownAsync = promisify(chown);
export const lstatAsync = promisify(lstat);
export const mkdirAsync = promisify(mkdir);
export const symlinkAsync = promisify(symlink);
export const writeFileAsync = promisify(writeFile);
