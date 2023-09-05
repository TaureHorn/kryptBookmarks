import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FileSubmitter from "./fileSubmitter";

import { ApiDaemon } from "../functions/apiDaemon";

export default function Encrypter(props) {
  const navigate = useNavigate();
  const api = new ApiDaemon();
  const title = "krypt/encrypter";
  const [formData, setFormData] = useState("");
  const [preloadFile, changePreloadFile] = useState(false);
  const [message, setMessage] = useState(title);

  const [fileRecieved, setFileRecieved] = useState(false);
  const [encryptedFile, setEncryptedFile] = useState("");

  useEffect(() => {
    if (formData) {
      apiCall();
    }
  }, [formData]);

  useEffect(() => {
    if (message !== title) {
      setTimeout(() => {
        setMessage(title);
      }, 10000);
    }
  }, [message]);

  function apiCall() {
    api
      .encrypt(formData.algorith, formData.file, formData.key)
      .then((response) => {
        const constructor = Object.getPrototypeOf(response).constructor.name;
        if (constructor === "AxiosError") {
          setMessage(`${response.code}: ${response.message}`);
          return;
        } else if (constructor === "Object") {
          if (typeof response.data === "string") {
            setEncryptedFile(response.data);
            setFileRecieved(true);
          } else if (!typeof response.data === "string") {
            setMessage("damn, something broke... no idea what");
          }
        }
      });
  }

  async function fileDownload() {
    fileRecieved
      ? api.downloader(encryptedFile, "links", formData.algorithm)
      : setMessage("no file recieved to download");
  }

  return (
    <>
      <h1 className="title">{message}</h1>
      {fileRecieved ? (
        <div className="center">
          <p>{`${formData.algorithm} encryption successful:`}</p>
          <p>"{encryptedFile.slice(0, 50)}..."</p>
          <button onClick={() => fileDownload()}>download</button>
        </div>
      ) : (
        <div className="center">
          <button onClick={() => changePreloadFile(preloadFile ? false : true)}>
            {preloadFile ? <>unload</> : <>load</>} current bookmarks
          </button>
          <FileSubmitter
            bookmarks={JSON.stringify(props.bookmarks.data)}
            data={(formData) => setFormData(formData)}
            fileType={"json"}
            preloadedFile={preloadFile}
          />
        </div>
      )}
      <button className="bottom" onClick={() => navigate("/")}>
        back to bookmarks
      </button>
    </>
  );
}
