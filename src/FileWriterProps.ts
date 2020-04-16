import type BaseFileWriterProps from './BaseFileWriterProps';

export default interface FileWriterProps extends BaseFileWriterProps {
  data: string | Buffer;
}
