import type BaseFileWriterProps from './BaseFileWriterProps';

export default interface SymbolicLinkWriterProps extends BaseFileWriterProps {
  target: string;
  relative?: boolean;
}
