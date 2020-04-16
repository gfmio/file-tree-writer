import FileType from './FileType';
import type FileProps from './FileProps';

function File(props: Omit<FileProps, 'type' | 'name'>): Omit<FileProps, 'name'>;
function File(props: Omit<FileProps, 'type'>): FileProps;
function File(props: Omit<FileProps, 'type' | 'name'> | Omit<FileProps, 'type'>) {
  return {
    type: FileType.File,
    ...props,
  };
}

export default File;
