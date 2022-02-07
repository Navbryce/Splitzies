import { URLS } from "../urls";

export async function generateSheet(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  // TODO: Error handling
  return (
    await fetch(URLS.baseApiUrl + URLS.api.generateSheet, {
      method: "POST",
      body: formData,
    })
  ).json();
}
