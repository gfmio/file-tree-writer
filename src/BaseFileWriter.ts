import chmod from './chmod';
import chown from './chown';
import EventEmitter from 'eventemitter3';
import type BaseFileWriterProps from './BaseFileWriterProps';
import type FileSystemWriter from './FileSystemWriter';
import type WriteEvent from './WriteEvent';

export default abstract class BaseFileWriter<E extends WriteEvent> implements FileSystemWriter {
  protected eventEmitter = new EventEmitter();

  constructor(protected props: BaseFileWriterProps) {}

  public abstract write(path: string): Promise<void>;

  public writeTo(path: string): Promise<void> {
    return this.write(path);
  }

  /* istanbul ignore next */
  public on(event: 'write', handler: (eventArgs: E) => void) {
    this.eventEmitter.on(event, handler);
    return this;
  }

  /* istanbul ignore next */
  public addListener(event: 'write', handler: (eventArgs: E) => void) {
    this.eventEmitter.addListener(event, handler);
    return this;
  }

  /* istanbul ignore next */
  public once(event: 'write', handler: (eventArgs: E) => void) {
    this.eventEmitter.once(event, handler);
    return this;
  }

  /* istanbul ignore next */
  public off(event: 'write', handler: (eventArgs: E) => void, once?: boolean) {
    this.eventEmitter.off(event, handler, undefined, once);
    return this;
  }

  /* istanbul ignore next */
  public removeListener(event: 'write', handler: (eventArgs: E) => void, once?: boolean) {
    this.eventEmitter.removeListener(event, handler, undefined, once);
    return this;
  }

  /* istanbul ignore next */
  protected emit(event: 'write', eventArgs: E) {
    this.eventEmitter.emit(event, eventArgs);
    return this;
  }

  protected chmod(path: string) {
    return chmod(path, this.props.owner);
  }

  protected chown(path: string) {
    return chown(path, this.props.owner, this.props.group);
  }
}
