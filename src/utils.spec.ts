import * as crypto from 'crypto';
import { exists, lstat, mkdir, readdir, readFile, unlink, writeFile } from 'fs';
import { promisify } from 'util';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';

export const existsAsync = promisify(exists);
export const lstatAsync = promisify(lstat);
export const mkdirAsync = promisify(mkdir);
export const readFileAsync = promisify(readFile);
export const readdirAsync = promisify(readdir);
export const unlinkAsync = promisify(unlink);
export const writeFileAsync = promisify(writeFile);

export const rimrafAsync = promisify(rimraf);

export const TMP_DIR = os.tmpdir();

export const randomName = (n: number = 16) => crypto.createHash('sha1').update(crypto.randomBytes(n)).digest('hex');

export const createRandomDirectory = async (parent: string = TMP_DIR) => {
  const filename = path.join(parent, randomName());
  await mkdirAsync(filename, { recursive: true });
  return filename;
};

export const createRandomFile = async (parent: string = TMP_DIR) => {
  await mkdirAsync(parent, { recursive: true });
  const filename = path.join(parent, randomName());
  await writeFileAsync(filename, '');
  return filename;
};
