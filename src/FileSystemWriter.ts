export default interface FileSystemWriter {
  write(to: string): Promise<void>;
}
