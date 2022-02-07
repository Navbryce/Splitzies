import { createContext } from "preact";
import { GoogleApiClient } from "./utils/GoogleApiClient";

export const GAPIContext = createContext<GoogleApiClient | undefined>(
  undefined
);
