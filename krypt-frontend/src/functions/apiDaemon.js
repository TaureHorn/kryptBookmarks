import axios from "axios";

import { objectIsEmpty } from "./objectIsEmpty";

import FileSaver from "file-saver";

const URL = process.env.REACT_APP_BACKEND_URL;
const expiryWindow = process.env.REACT_APP_COOKIE_EXPIRY;

export class ApiDaemon {
  async decrypt(algorithm, file, key) {
    let decrypted = "";
    try {
      decrypted = await axios.post(`${URL}/crypto/decrypt`, {
        algorithm,
        file,
        key,
      });
    } catch (error) {
      decrypted = error.message;
    }
    if (decrypted.status === 200 && objectIsEmpty(decrypted.data) === false) {
      this.dataSaver(decrypted.data);
      return decrypted.data;
    } else {
      return decrypted;
    }
  }
  async encrypt(algorithm, file, key) {
    console.log("You cant encrypt what you cant see");
  }
  async downloader(file, name, algorithm) {
    console.log("I aint got nothing to download my guy");
  }
  dataSaver(data) {
    localStorage.setItem("bookmarks", JSON.stringify(data));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryWindow);
    document.cookie = `bookmarksStorage=true; expires= ${expiryDate.toUTCString()}; sameSite=Strict`;
  }
}
