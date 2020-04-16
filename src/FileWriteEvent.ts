import FileWriterProps from './FileWriterProps';
import type FileType from './FileType';
import type WriteEvent from './WriteEvent';

type FileWriterPropsWithoutData = Omit<FileWriterProps, 'data'>;

export default interface FileWriteEvent extends WriteEvent<FileType.File>, FileWriterPropsWithoutData {}
