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
        } else if (constructor === "Object") {
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

  function newBlankFile() {
    const newBookmarks = new Bookmarks(true, {
      "new category": [
        {
          name: "replace me",
          url: "https://github.com/TaureHorn/kryptBookmarks",
        },
      ],
    });
    api.dataSaver(newBookmarks._bookmarksJSON);
    props.bookmarks(newBookmarks);
  }

  return (
    <>
      <h1 className="center top">{message}</h1>
      <div className="border blur center middle">
        <FileSubmitter
          data={(formData) => setFormData(formData)}
          fileType={"text"}
        />
      </div>
      <button onClick={() => newBlankFile()} className="bottom biggerButton center">
        create new blank file
      </button>
    </>
  );
}
