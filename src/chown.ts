import { chownAsync, lstatAsync } from './fs';
import getGidByName from 'gid-by-name';
import getUidByName from 'uid-by-name';
import isNotNullOrUndefined from './isNotNullOrUndefined';

export default async function chown(
  path: string,
  owner?: string | number | null | undefined,
  group?: string | number | null | undefined,
) {
  if (isNotNullOrUndefined(owner) || isNotNullOrUndefined(group)) {
    const lstat = await lstatAsync(path);

    let uid = lstat.uid;

    if (typeof owner === 'number') {
      uid = owner;
    } else if (typeof owner === 'string') {
      const ownerUid = getUidByName(owner);
      if (ownerUid) {
        uid = ownerUid;
      }
    }

    let gid = lstat.gid;

    if (typeof group === 'number') {
      gid = group;
    } else if (typeof group === 'string') {
      const groupGid = getGidByName(group);
      if (groupGid) {
        gid = groupGid;
      }
    }

    await chownAsync(path, uid, gid);
  }
}
