import axios from "axios";

import FileSaver from "file-saver";

const URL = window.location.protocol === 'https' ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_LOCAL_URL
const expiryWindow = parseInt(process.env.REACT_APP_COOKIE_EXPIRY);

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
            decrypted = error;
        }
        return decrypted;
    }

    async encrypt(algorithm, file, key) {
        let encrypted = "";
        try {
            encrypted = await axios.post(`${URL}/crypto/encrypt`, {
                algorithm,
                file,
                key,
            });
        } catch (error) {
            encrypted = error;
        }
        return encrypted;
    }

    async downloader(file, name, algorithm) {
        const fileToDownload = new File([file], `${name}.${algorithm}`, {
            type: "text/plain",
        });
        FileSaver.saveAs(fileToDownload);
    }

    dataSaver(data) {
        localStorage.setItem("bookmarks", JSON.stringify(data));
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expiryWindow);
        document.cookie = `bookmarksStorage=true; expires= ${expiryDate.toUTCString()}; sameSite=Strict`;
    }

    dataTester(data) {
        return typeof Object.entries(data) === "object" ? true : false;
    }
}
