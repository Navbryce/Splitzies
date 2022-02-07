import { createContext } from "preact";

export const GAPIContext = createContext<typeof gapi.client | undefined>(
  undefined
);
