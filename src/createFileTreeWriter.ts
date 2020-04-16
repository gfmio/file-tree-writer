import FileTreeWriter from './FileTreeWriter';
import type DirectoryProps from './DirectoryProps';
import type FileProps from './FileProps';
import type SymbolicLinkProps from './SymbolicLinkProps';

export default function createFileTreeWriter(props: FileProps | DirectoryProps | SymbolicLinkProps) {
  return new FileTreeWriter(props);
}
