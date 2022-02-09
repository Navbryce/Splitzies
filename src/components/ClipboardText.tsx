import { FunctionalComponent, h, Fragment } from "preact";
import ClipboardIcon from "./icons/ClipboardIcon";
import { useCallback, useState } from "preact/compat";

type Props = {
  text: string;
};

const ClipboardText: FunctionalComponent<Props> = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);
  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    await setCopied(true);
    setTimeout(() => setCopied(false), 250);
  }, []);
  return (
    <div
      class="dark:bg-primary-900 p-3 flex flex-row rounded-md hover:bg-secondary-200 cursor-pointer"
      onClick={onClick}
    >
      {!copied && (
        <Fragment>
          <span className="mr-2">{text}</span>
          <ClipboardIcon />
        </Fragment>
      )}
      {copied && (
        <Fragment>
          <span>Copied</span>
        </Fragment>
      )}
    </div>
  );
};

export default ClipboardText;
