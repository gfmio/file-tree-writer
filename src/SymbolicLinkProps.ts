import FileType from './FileType';
import type SymbolicLinkWriterProps from './SymbolicLinkWriterProps';

export default interface SymbolicLinkProps extends SymbolicLinkWriterProps {
  type: FileType.SymbolicLink;
}
