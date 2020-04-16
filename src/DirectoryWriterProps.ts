import type BaseFileWriter from './BaseFileWriter';
import type BaseFileWriterProps from './BaseFileWriterProps';

export default interface DirectoryWriterProps extends BaseFileWriterProps {
  children: BaseFileWriter<any>[];
}
