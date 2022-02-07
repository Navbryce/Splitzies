import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { useCallback, useContext, useState } from "preact/compat";
import { generateSheet } from "../../actions/generate-sheet";
import { GAPIContext } from "../../contexts";

const Home: FunctionalComponent = () => {
  const gapiClient = useContext(GAPIContext);

  const [file, setFile] = useState<File>();
  const onSplitzies = useCallback(() => {
    if (file && gapiClient) {
      generateSheet(file);
    }
  }, [file, gapiClient]);
  return (
    <div class={style.home}>
      <h1>Instacart Receipt Splitter</h1>
      <h2>How it works?</h2>
      <p>
        The app will parse the items in your receipt and generate a spreadsheet
        under your Google drive account. You can share this spreadsheet to your
        friends, who will claim the items they purchased. The Google Sheet will
        calculate how much is owed to you.
      </p>
      <h2>Do we store any of your data?</h2>
      <p>No. This app has no database. We do not store anything.</p>
      <h2>Splitzies!</h2>
      <ol>
        <li>Download the Instacart receipt HTML (ONLY the HTML)</li>
        <li>Select receipt: </li>
        <FileUpload onChange={setFile} />
        <li>
          <button onClick={onSplitzies}>Splitzies!</button>
        </li>
      </ol>
    </div>
  );
};

export default Home;
