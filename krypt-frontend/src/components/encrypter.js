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
      .encrypt(formData.algorithm, formData.file, formData.key)
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
      <h1 className="center top">{message}</h1>
      {fileRecieved ? (
        <div className="border blur center middle">
          <span className="alert formAlert">{`${formData.algorithm} encryption successful:`}</span>
          <p
            className="highlight justifyCenter"
            style={{ fontWeight: "bold" }}
          >{`LINKS.${formData.algorithm.toUpperCase()}:`}</p>
          <p className="padding">"{encryptedFile.slice(0, 70)}..."</p>
          <div className="flex">
            <button
              className="biggerButton formSubmit"
              onClick={() => fileDownload()}
            >
              download
            </button>
            <button
              className="biggerButton formSubmit"
              onClick={() => setFileRecieved(false)}
            >
              encrypt another file
            </button>
          </div>
        </div>
      ) : (
        <div className="border blur center middle">
          <FileSubmitter
            bookmarks={JSON.stringify(Object.fromEntries(props.bookmarks.data))}
            data={(formData) => setFormData(formData)}
            fileType={"json"}
            preloadedFile={preloadFile}
          />
        </div>
      )}
      <div className="bottom center">
        {fileRecieved ? (
          <></>
        ) : (
          <button
            className="biggerButton"
            onClick={() => changePreloadFile(preloadFile ? false : true)}
          >
            {preloadFile ? <>unload</> : <>load</>} current bookmarks
          </button>
        )}{" "}
        <button className="biggerButton" onClick={() => navigate("/")}>
          back to bookmarks
        </button>
      </div>
    </>
  );
}
