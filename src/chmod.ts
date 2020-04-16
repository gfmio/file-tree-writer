import { chmodAsync } from './fs';
import isNotNullOrUndefined from './isNotNullOrUndefined';

export default async function chmod(path: string, mode?: string | number | null | undefined) {
  if (isNotNullOrUndefined(mode)) {
    await chmodAsync(path, mode);
  }
}
