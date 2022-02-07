import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import useScript from "../hooks/use-script";
import { useCallback, useEffect, useState } from "preact/compat";
import { GAPIContext } from "../contexts";

const GOOGLE_SCOPES = ".../auth/spreadsheets.readonly";
const GOOGLE_SHEETS_DISCOVER_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

const App: FunctionalComponent = () => {
  const [googleApi, setGoogleApi] = useState<typeof gapi>();
  const [gapiClient, setGapiClient] = useState<typeof gapi.client>();

  const handleClientLoad = useCallback(() => {
    setGoogleApi((window as unknown as { gapi: typeof gapi }).gapi);
  }, []);

  const initClientCallback = useCallback(async () => {
    await gapi.client.init({
      apiKey: process.env.GOOGLE_API_KEY,
      discoveryDocs: GOOGLE_SHEETS_DISCOVER_DOCS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      scope: GOOGLE_SCOPES,
    });
    setGapiClient(gapi.client);
  }, [googleApi]);

  useEffect(() => {
    if (googleApi) {
      googleApi.load("client:auth2", initClientCallback);
    }
  }, [googleApi, initClientCallback]);

  useScript("https://apis.google.com/js/api.js", {
    onload: handleClientLoad,
  });

  return (
    <GAPIContext.Provider value={gapiClient}>
      <div id="preact_root">
        <Header />
        <Router>
          <Route path="/" component={Home} />
          <NotFoundPage default />
        </Router>
      </div>
    </GAPIContext.Provider>
  );
};

export default App;
