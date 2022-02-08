import { FunctionalComponent, h } from "preact";
import FileUpload from "../../components/file-upload/FileUpload";
import { useCallback, useContext, useEffect, useState } from "preact/compat";
import { generateSheet } from "../../actions/generate-sheet";
import { GAPIContext } from "../../contexts";
import ClipboardText from "../../components/clipboard-text/ClipboardText";
import Spinner from "../../components/spinner/Spinner";

const Home: FunctionalComponent = () => {
  const googleApi = useContext(GAPIContext);

  useEffect(() => {
    if (!googleApi) {
      return;
    }
  }, [googleApi]);

  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const onSplitzies = useCallback(async () => {
    if (!file || !googleApi) {
      return;
    }
    // TODO: Error handling, load icon, copy and paste url
    setLoading(true);
    await googleApi.execute(async (api) => {
      const spreadSheet = await generateSheet(file);
      const response = await (api.client as any).sheets.spreadsheets.create(
        spreadSheet
      );
      setUrl(response.result.spreadsheetUrl);
    });
    setLoading(false);
  }, [file, googleApi]);
  return (
    <div class="p-6">
      <h1>Instacart Receipt Splitter</h1>
      <div class="border-2 rounded-md p-3">
        <div class="m-3">
          <h2>How it works?</h2>
          <p>
            The app will parse the items in your receipt and generate a
            spreadsheet under your Google drive account. You can share this
            spreadsheet to your friends, who will claim the items they
            purchased. The Google Sheet will calculate how much is owed to you.
          </p>
        </div>
        <div class="m-3 mt-5">
          <h2>Do we store any of your data?</h2>
          <p>No. This app has no database. We do not store anything.</p>
        </div>
      </div>
      <div class="m-3">
        <ol class="list-decimal">
          <li class="p-3">
            Download the Instacart receipt HTML (ONLY the HTML)
          </li>
          <li class="p-3">
            <div>
              Select receipt:
              <FileUpload onChange={setFile} accept={".html"} />
            </div>
          </li>
          <li class="p-3">
            <button onClick={onSplitzies}>
              {loading && <Spinner />}Splitzies!
            </button>
          </li>
        </ol>
        {url && <ClipboardText text={url} />}
      </div>
    </div>
  );
};

export default Home;
