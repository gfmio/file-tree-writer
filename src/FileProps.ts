import type FileType from './FileType';
import type FileWriterProps from './FileWriterProps';

export default interface FileProps extends FileWriterProps {
  type: FileType.File;
}
