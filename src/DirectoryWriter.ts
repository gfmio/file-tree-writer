import { mkdirAsync } from './fs';
import BaseFileWriter from './BaseFileWriter';
import FileType from './FileType';
import path from 'path';
import type DirectoryWriteEvent from './DirectoryWriteEvent';
import type DirectoryWriterProps from './DirectoryWriterProps';

export default class DirectoryWriter extends BaseFileWriter<DirectoryWriteEvent> {
  public static readonly DEFAULT_MODE = '755';

  protected props!: DirectoryWriterProps;

  constructor(props: DirectoryWriterProps) {
    super({ ...props });
    this.props.mode = this.props.mode || DirectoryWriter.DEFAULT_MODE;
  }

  public async write(to: string) {
    const filePath = path.join(to, this.props.name);

    await mkdirAsync(filePath, { recursive: true });
    await this.chmod(filePath);
    await this.chown(filePath);

    this.emit('write', {
      type: FileType.Directory,
      path: filePath,
      name: this.props.name,
      group: this.props.group,
      mode: this.props.mode,
      owner: this.props.owner,
    });

    for (const child of this.props.children) {
      await child.write(filePath);
    }
  }
}
