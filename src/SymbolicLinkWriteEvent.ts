import type FileType from './FileType';
import type SymbolicLinkWriterProps from './SymbolicLinkWriterProps';
import type WriteEvent from './WriteEvent';

export default interface SymbolicLinkWriteEvent extends WriteEvent<FileType.SymbolicLink>, SymbolicLinkWriterProps {}
