import { createRandomDirectory, createRandomFile, lstatAsync, randomName, rimrafAsync } from './utils.spec';
import { describe, it, setup, teardown } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chown from './chown';
import getGidByName from 'gid-by-name';
import os from 'os';

chai.use(chaiAsPromised);

describe('chown', () => {
  const userInfo = os.userInfo();
  let baseDir: string;
  let file1: string;
  let file2: string;
  let file3: string;
  let file4: string;

  setup(async () => {
    baseDir = await createRandomDirectory();
    file1 = await createRandomFile(baseDir);
    file2 = await createRandomFile(baseDir);
    file3 = await createRandomFile(baseDir);
    file4 = await createRandomFile(baseDir);
  });

  it('sets the uid correctly when a username is provided', () =>
    expect(
      (async () => {
        await chown(file1, userInfo.username);
        return (await lstatAsync(file1)).uid === userInfo.uid;
      })(),
    ).to.eventually.equal(true));

  it('sets the uid correctly when a uid is provided', () =>
    expect(
      (async () => {
        await chown(file1, userInfo.uid);
        return (await lstatAsync(file1)).uid === userInfo.uid;
      })(),
    ).to.eventually.equal(true));

  it('sets the gid correctly when group name is provided', () =>
    expect(
      (async () => {
        const groups = [userInfo.username, 'staff', 'root', 'wheel'];
        const gids = groups.map(getGidByName);
        const index = gids.findIndex(value => typeof value === 'number' && value >= 0);
        if (index === -1) {
          // eslint-disable-next-line no-console
          console.info("Couldn't test because no matching groups were found");
          return true;
        }
        const group = groups[index];
        const gid = gids[index];
        await chown(file2, undefined, group);
        return (await lstatAsync(file2)).gid === gid;
      })(),
    ).to.eventually.equal(true));

  it('sets the gid correctly when gid is provided', () =>
    expect(
      (async () => {
        await chown(file2, undefined, userInfo.gid);
        return (await lstatAsync(file2)).gid === userInfo.gid;
      })(),
    ).to.eventually.equal(true));

  it('does not set the uid or gid when no user or group is provided', () =>
    expect(
      (async () => {
        const { uid, gid } = await lstatAsync(file3);
        await chown(file3);
        const { uid: newUid, gid: newGid } = await lstatAsync(file3);
        return uid === newUid && gid === newGid;
      })(),
    ).to.eventually.equal(true));

  it('does not set the uid or gid when an unknown user or group is provided', () =>
    expect(
      (async () => {
        const { uid, gid } = await lstatAsync(file3);
        await chown(file3, randomName(), randomName());
        const { uid: newUid, gid: newGid } = await lstatAsync(file3);
        return uid === newUid && gid === newGid;
      })(),
    ).to.eventually.equal(true));

  teardown(() => rimrafAsync(baseDir));
});
