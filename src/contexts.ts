import { createContext } from "preact";
import { GoogleApiClient } from "./utils/GoogleApiClient";
import { AlertService } from "./utils/Alert";

export const GAPIContext = createContext<GoogleApiClient | undefined>(
  undefined
);

export const AlertContext = createContext<AlertService>(new AlertService());
