import DirectoryWriterProps from './DirectoryWriterProps';
import type FileType from './FileType';
import type WriteEvent from './WriteEvent';

type DirectoryPropsWithoutChildren = Omit<DirectoryWriterProps, 'children'>;

export default interface DirectoryWriteEvent extends WriteEvent<FileType.Directory>, DirectoryPropsWithoutChildren {}
