import { createRandomDirectory, createRandomFile, lstatAsync, rimrafAsync } from './utils.spec';
import { describe, it, setup, teardown } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chmod from './chmod';

chai.use(chaiAsPromised);

describe('chmod', () => {
  let baseDir: string;
  let file1: string;
  let file2: string;

  setup(async () => {
    baseDir = await createRandomDirectory();
    file1 = await createRandomFile(baseDir);
    file2 = await createRandomFile(baseDir);
  });

  it('sets the mode correctly', () =>
    expect(
      (async () => {
        await chmod(file1, '777');
        return (await lstatAsync(file1)).mode.toString(8).endsWith('777');
      })(),
    ).to.eventually.equal(true));

  it('does not do anything when no mode is provided', () =>
    expect(
      (async () => {
        const currentMode = (await lstatAsync(file2)).mode;
        await chmod(file2);
        return (await lstatAsync(file2)).mode === currentMode;
      })(),
    ).to.eventually.equal(true));

  teardown(() => rimrafAsync(baseDir));
});
