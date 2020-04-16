# file-tree-writer

This package provides utilities for defining and writing trees of files, e.g. when generating a large number files based on a template.

## Install

```sh
# With yarn
yarn add file-tree-writer

# With npm
npm install file-tree-writer

```

## Usage

The package exposes the `createFileTreeWriter` function to create the `FileTreeWriter` object.

It accepts a `FileProps`, `DirectoryProps` or `SymbolicLinkProps` object that you can create with the `File`, `Directory` and `SymbolicLink` functions. These descriptors contain the name and content of your file and its data (for files), children (for directories) and target for symbolic links. Additionally, you can set the `mode` of each generated file as a string, number or octal (`'777'` or `'0o777'`), `owner` (as a UID or by username) and group (as a GID or by group name).

You can then asynchronously write the file tree to a directory with `fileTreeWriter.writeTo`.

The `FileTreeWriter` object also exposes an `EventEmitter`-like interface to add event listeners for when a file has been written.

```ts
import { createFileTreeWriter, Directory, File, SymbolicLink } from './src';

const files = Directory({
  name: 'some-dir',
  mode: '755',
  children: [
    File({
      name: 'some-file.txt',
      mode: '644',
      owner: 'root',
      group: 'root',
      data: '...',
    }),
    SymbolicLink({
      name: 'a-symlink',
      target: './some-file.txt',
    }),
  ],
});

const fileTreeWriter = createFileTreeWriter(files);
fileTreeWriter.on('write', e => console.info(`Writing ${e.path}`));

const main = async () => {
  await fileTreeWriter.writeTo('./out');
};

main();
```

This will print:

```txt
Writing out/some-dir
Writing out/some-dir/some-file.txt
Writing out/some-dir/a-symlink
```

## License

[MIT](LICENSE)
