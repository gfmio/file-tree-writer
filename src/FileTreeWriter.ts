import BaseFileWriter from './BaseFileWriter';
import DirectoryWriter from './DirectoryWriter';
import FileType from './FileType';
import FileWriter from './FileWriter';
import SymbolicLinkWriter from './SymbolicLinkWriter';
import type DirectoryProps from './DirectoryProps';
import type DirectoryWriteEvent from './DirectoryWriteEvent';
import type FileProps from './FileProps';
import type FileWriteEvent from './FileWriteEvent';
import type SymbolicLinkProps from './SymbolicLinkProps';
import type SymbolicLinkWriteEvent from './SymbolicLinkWriteEvent';

export default class FileTreeWriter extends BaseFileWriter<
  FileWriteEvent | DirectoryWriteEvent | SymbolicLinkWriteEvent
> {
  protected props!: FileProps | DirectoryProps | SymbolicLinkProps;

  constructor(props: FileProps | DirectoryProps | SymbolicLinkProps) {
    super(props);
  }

  public write(path: string) {
    const writer = this.writer();
    writer.on('write', this.emitWrite);
    return writer.write(path);
  }

  protected writer(): FileWriter | DirectoryWriter | SymbolicLinkWriter {
    switch (this.props.type) {
      case FileType.File: {
        return new FileWriter(this.props);
      }
      case FileType.Directory: {
        const children = this.props.children;
        return new DirectoryWriter({
          ...this.props,
          children:
            typeof children === 'undefined' || children === null
              ? []
              : (Array.isArray(children)
                  ? children
                  : Object.keys(children).map(name => ({ ...children[name], name }))
                ).map(props => {
                  const childWriter = new FileTreeWriter(props);
                  childWriter.on('write', this.emitWrite);
                  return childWriter;
                }),
        });
      }
      case FileType.SymbolicLink: {
        return new SymbolicLinkWriter(this.props);
      }
    }
  }

  protected readonly emitWrite = (e: FileWriteEvent | DirectoryWriteEvent | SymbolicLinkWriteEvent) =>
    this.emit('write', e);
}
