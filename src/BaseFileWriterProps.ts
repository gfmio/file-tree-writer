export default interface BaseFileWriterProps {
  name: string;
  mode?: string | number | null | undefined;
  owner?: string | number | null | undefined;
  group?: string | number | null | undefined;
}
