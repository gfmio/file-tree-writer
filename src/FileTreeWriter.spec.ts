import {
  createRandomDirectory,
  existsAsync,
  lstatAsync,
  randomName,
  readdirAsync,
  readFileAsync,
  rimrafAsync,
} from './utils.spec';
import { describe, it, setup, teardown } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createFileTreeWriter from './createFileTreeWriter';
import Directory from './Directory';
import File from './File';
import FileTreeWriter from './FileTreeWriter';
import path from 'path';
import SymbolicLink from './SymbolicLink';

chai.use(chaiAsPromised);

describe('FileTreeWriter', () => {
  let baseDir: string;
  setup(async () => {
    baseDir = await createRandomDirectory();
  });

  it('creates a file with the correct contents', () =>
    expect(
      (async () => {
        const test1 = File({ data: randomName(), name: randomName() });

        const fileTreeWriter = createFileTreeWriter(test1);
        await fileTreeWriter.writeTo(baseDir);

        const test1Path = path.join(baseDir, test1.name);

        if (!(await existsAsync(test1Path))) {
          throw new Error('File does not exist');
        }
        if ((await readFileAsync(test1Path)).toString() !== test1.data) {
          throw new Error('File has incorrect contents');
        }
      })(),
    ).to.eventually.be.fulfilled);

  it('creates a directory with the correct files', () =>
    expect(
      (async () => {
        const fileName = randomName();
        const test21 = File({ name: fileName, data: randomName() });

        const dirName = randomName();
        const test22 = Directory({
          name: dirName,
          children: [test21],
        });

        const fileTreeWriter = createFileTreeWriter(test22);
        await fileTreeWriter.writeTo(baseDir);

        const test22Path = path.join(baseDir, test22.name);
        const test21Path = path.join(test22Path, test21.name);

        if (!(await existsAsync(test22Path))) {
          throw new Error('Directory does not exist');
        }
        if (!(await lstatAsync(test22Path)).isDirectory()) {
          throw new Error('Directory is not a directory');
        }
        if (!(await existsAsync(test21Path))) {
          throw new Error('Directory does not have the correct files');
        }
        if ((await readFileAsync(test21Path)).toString() !== test21.data) {
          throw new Error('File has incorrect contents');
        }
        const files = await readdirAsync(test22Path);
        if (files.length !== 1) {
          throw new Error('Directory has the wrong set of files');
        }
      })(),
    ).to.eventually.be.fulfilled);

  it('creates symlinks that resolve correctly', () =>
    expect(
      (async () => {
        const dirName = randomName();
        const fileName = randomName();
        const symlinkName = randomName();
        const symlinkName2 = randomName();

        const test31 = File({ name: fileName, data: randomName() });
        const test32 = SymbolicLink({ name: symlinkName, target: fileName });
        const test33 = SymbolicLink({
          name: symlinkName2,
          target: path.join(baseDir, dirName, fileName),
          relative: true,
        });
        const test34 = Directory({
          name: dirName,
          children: [test31, test32 as any, test33 as any],
        });

        const fileTreeWriter = createFileTreeWriter(test34);
        await fileTreeWriter.writeTo(baseDir);

        const test34Path = path.join(baseDir, test34.name);
        const test31Path = path.join(test34Path, test31.name);
        const test32Path = path.join(test34Path, test32.name);
        const test33Path = path.join(test34Path, test33.name);

        if (!(await existsAsync(test34Path))) {
          throw new Error('Directory does not exist');
        }
        if ((await Promise.all([test31Path, test32Path, test33Path].map(existsAsync))).some(value => !value)) {
          throw new Error('Directory does not have the correct files');
        }
        if ((await readFileAsync(test31Path)).toString() !== test31.data) {
          throw new Error('File has incorrect contents');
        }
        if (!(await lstatAsync(test32Path)).isSymbolicLink()) {
          throw new Error('File is not a symlink');
        }
        if ((await readFileAsync(test32Path)).toString() !== test31.data) {
          throw new Error('Symlink does not resolve correctly');
        }
        if (!(await lstatAsync(test33Path)).isSymbolicLink()) {
          throw new Error('File is not a symlink');
        }
        if ((await readFileAsync(test33Path)).toString() !== test31.data) {
          throw new Error('Relative symlink does not resolve correctly');
        }
      })(),
    ).to.eventually.be.fulfilled);

  it('creates an empty directory when children is null', () =>
    expect(
      (async () => {
        const dirName = randomName();

        const test4 = Directory({
          name: dirName,
          children: null,
        });

        const fileTreeWriter = createFileTreeWriter(test4);
        await fileTreeWriter.writeTo(baseDir);

        const test4Path = path.join(baseDir, test4.name);

        if (!(await existsAsync(test4Path))) {
          throw new Error('Directory does not exist');
        }
        const files = await readdirAsync(test4Path);
        if (files.length !== 0) {
          throw new Error('Directory incorrectly has children');
        }
      })(),
    ).to.eventually.be.fulfilled);

  it('creates a directory with the correct files when using an object for children', () =>
    expect(
      (async () => {
        const fileName = randomName();
        const test51 = File({ data: randomName() });

        const dirName = randomName();
        const test52 = Directory({
          name: dirName,
          children: {
            [fileName]: test51,
          },
        });

        const fileTreeWriter = new FileTreeWriter(test52);
        await fileTreeWriter.writeTo(baseDir);

        const test52Path = path.join(baseDir, test52.name);
        const test51Path = path.join(test52Path, fileName);

        if (!(await existsAsync(test52Path))) {
          throw new Error('Directory does not exist');
        }
        if (!(await lstatAsync(test52Path)).isDirectory()) {
          throw new Error('Directory is not a directory');
        }
        if (!(await existsAsync(test51Path))) {
          throw new Error('Directory does not have the correct files');
        }
        if ((await readFileAsync(test51Path)).toString() !== test51.data) {
          throw new Error('File has incorrect contents');
        }
        const files = await readdirAsync(test52Path);
        if (files.length !== 1) {
          throw new Error('Directory has the wrong set of files');
        }
      })(),
    ).to.eventually.be.fulfilled);

  teardown(() => rimrafAsync(baseDir));
});
