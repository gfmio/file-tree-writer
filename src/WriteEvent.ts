import FileType from './FileType';

export default interface WriteEvent<T extends FileType = FileType> {
  type: T;
  path: string;
}
