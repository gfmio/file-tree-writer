import FileType from './FileType';
import type SymbolicLinkProps from './SymbolicLinkProps';

const SymbolicLink = (props: Omit<SymbolicLinkProps, 'type'>): SymbolicLinkProps => ({
  type: FileType.SymbolicLink,
  ...props,
});

export default SymbolicLink;
