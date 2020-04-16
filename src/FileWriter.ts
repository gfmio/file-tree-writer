import { writeFileAsync } from './fs';
import BaseFileWriter from './BaseFileWriter';
import FileType from './FileType';
import FileWriteEvent from './FileWriteEvent';
import path from 'path';
import type FileWriterProps from './FileWriterProps';

export default class FileWriter extends BaseFileWriter<FileWriteEvent> {
  public static readonly DEFAULT_MODE = '644';

  protected props: FileWriterProps;

  constructor(props: FileWriterProps) {
    super({ ...props });
    this.props.mode = this.props.mode || FileWriter.DEFAULT_MODE;
  }

  public async write(to: string) {
    const filePath = path.join(to, this.props.name);

    await writeFileAsync(filePath, this.props.data);
    await this.chmod(filePath);
    await this.chown(filePath);

    this.emit('write', {
      type: FileType.File,
      path: filePath,
      name: this.props.name,
      group: this.props.group,
      mode: this.props.mode,
      owner: this.props.owner,
    });
  }
}
