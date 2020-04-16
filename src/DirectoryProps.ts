import type BaseFileWriterProps from './BaseFileWriterProps';
import type FileProps from './FileProps';
import type FileType from './FileType';
import type SymbolicLinkProps from './SymbolicLinkProps';

export default interface DirectoryProps extends BaseFileWriterProps {
  type: FileType.Directory;
  children?:
    | Array<FileProps | DirectoryProps | SymbolicLinkProps>
    | Record<string, Omit<FileProps, 'name'> | Omit<DirectoryProps, 'name'> | Omit<SymbolicLinkProps, 'name'>>
    | null
    | undefined;
}
