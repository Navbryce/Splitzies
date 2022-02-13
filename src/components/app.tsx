import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Header from "./Header";
import useScript from "../hooks/use-script";
import { useCallback, useContext, useEffect, useState } from "preact/compat";
import { AlertContext, GAPIContext } from "../contexts";
import { GoogleApiClient } from "../utils/GoogleApiClient";
import PrivacyPolicy from "../routes/privacy-policy";
import Footer from "./Footer";

const GOOGLE_SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_DISCOVER_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

const App: FunctionalComponent = () => {
  const alertService = useContext(AlertContext);
  const [googleApi, setGoogleApi] = useState<typeof gapi>();
  const [initializedGoogleAPI, setInitializedGoogleAPI] =
    useState<GoogleApiClient>();

  const handleClientLoad = useCallback(() => {
    setGoogleApi((window as unknown as { gapi: typeof gapi }).gapi);
  }, []);

  const initClientCallback = useCallback(async () => {
    try {
      await gapi.client.init({
        apiKey: process.env.GOOGLE_API_KEY,
        discoveryDocs: GOOGLE_SHEETS_DISCOVER_DOCS,
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
      });
      setInitializedGoogleAPI(new GoogleApiClient(googleApi as typeof gapi));
    } catch (error) {
      if (
        (error as { details: string }).details
          ?.toLowerCase()
          .includes("cookies")
      ) {
        await alertService.alert({
          title: "Error",
          text: "Please enable 3rd party cookies and refresh the page. This a limitation of Google Auth and not of the Splitzies application.",
        });
        return;
      }
      throw error;
    }
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
        class="dark dark:bg-gradient-to-r dark:bg-primary-900 dark:from-primary-800 dark:text-blue-100 h-screen overflow-y-scroll flex flex-col justify-between"
      >
        <div>
          <Header />
          <Router>
            <Route path="/" component={Home} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <NotFoundPage default />
          </Router>
        </div>
        <Footer />
      </div>
    </GAPIContext.Provider>
  );
};

export default App;
