import { symlinkAsync } from './fs';
import BaseFileWriter from './BaseFileWriter';
import FileType from './FileType';
import path from 'path';
import type SymbolicLinkWriteEvent from './SymbolicLinkWriteEvent';
import type SymbolicLinkWriterProps from './SymbolicLinkWriterProps';

export default class SymbolicLinkWriter extends BaseFileWriter<SymbolicLinkWriteEvent> {
  protected props!: SymbolicLinkWriterProps;

  constructor(props: SymbolicLinkWriterProps) {
    super({ ...props });
  }

  public async write(to: string) {
    const filePath = path.join(to, this.props.name);
    const target = this.props.relative ? path.relative(to, this.props.target) : this.props.target;

    await symlinkAsync(target, filePath);
    await this.chmod(filePath);
    await this.chown(filePath);

    this.emit('write', { type: FileType.SymbolicLink, path: filePath, ...this.props });
  }
}
