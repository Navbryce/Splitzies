import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Header from "./header/Header";
import useScript from "../hooks/use-script";
import { useCallback, useEffect, useState } from "preact/compat";
import { GAPIContext } from "../contexts";
import { GoogleApiClient } from "../utils/GoogleApiClient";

const GOOGLE_SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_DISCOVER_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

const App: FunctionalComponent = () => {
  const [googleApi, setGoogleApi] = useState<typeof gapi>();
  const [initializedGoogleAPI, setInitializedGoogleAPI] =
    useState<GoogleApiClient>();

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
    setInitializedGoogleAPI(new GoogleApiClient(googleApi as typeof gapi));
  }, [googleApi]);

  useEffect(() => {
    if (googleApi) {
      googleApi.load("client:auth2", initClientCallback);
    }
  }, [googleApi, initClientCallback]);

  useScript("https://apis.google.com/js/api.js", {
    async: true,
    defer: true,
    onload: handleClientLoad,
  });

  return (
    <GAPIContext.Provider value={initializedGoogleAPI}>
      <div
        id="preact_root"
        class="dark dark:bg-gradient-to-r dark:bg-primary-900 dark:from-primary-800 dark:text-blue-100"
      >
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
