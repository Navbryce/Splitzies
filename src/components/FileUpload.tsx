import { FunctionalComponent, h } from "preact";
import { useCallback } from "preact/compat";

type Props = {
  onChange: (file: File) => void;
  accept?: string;
};

const FileUpload: FunctionalComponent<Props> = ({
  onChange,
  accept,
}: Props) => {
  const onFileChangeCallback = useCallback(
    (event: { target: EventTarget | null }) => {
      const target = event.target as HTMLInputElement | null;
      if (!target) {
        return;
      }
      if (target.files) {
        onChange(target.files[0] as File);
      }
    },
    [onChange]
  );

  return (
    <div>
      <input type="file" onChange={onFileChangeCallback} accept={accept} />
    </div>
  );
};
export default FileUpload;
