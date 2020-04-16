import FileType from './FileType';
import type DirectoryProps from './DirectoryProps';

const Directory = (props: Omit<DirectoryProps, 'type'>): DirectoryProps => ({
  type: FileType.Directory,
  ...props,
});

export default Directory;
