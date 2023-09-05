import { useEffect, useState } from "react";

import FileSubmitter from "./fileSubmitter";

import { ApiDaemon } from "../functions/apiDaemon";
import { Bookmarks } from "../functions/bookmarksClass";
import { objectIsEmpty } from "../functions/objectIsEmpty";

export default function ToDecrypt(props) {
  const [formData, setFormData] = useState("");
  const title = "krypt/decrypter";
  const [message, setMessage] = useState(title);
  const api = new ApiDaemon();

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
  });

  function apiCall() {
    api
      .decrypt(formData.algorithm, formData.file, formData.key)
      .then((response) => {
        const constructor = Object.getPrototypeOf(response).constructor.name;
        if (constructor === "AxiosError") {
          setMessage(`${response.code}: ${response.message}`);
          return;
        } else if (constructor == "Object") {
          const empty = objectIsEmpty(response.data);
          const valid = api.dataTester(response.data);
          if (empty === false && valid === true) {
            api.dataSaver(response.data);
            props.bookmarks(new Bookmarks(true, response.data));
          } else if (empty === false && valid === false) {
            setMessage("decrypted data not the correct format");
          } else if (empty === true) {
            setMessage("incorrect key / invalid file / incorrect algorithm");
          }
        }
      });
  }

  return (
    <>
      <h1 className="title">{message}</h1>
      <div className="center">
        <FileSubmitter
          data={(formData) => setFormData(formData)}
          fileType={"text"}
        />
      </div>
    </>
  );
}
