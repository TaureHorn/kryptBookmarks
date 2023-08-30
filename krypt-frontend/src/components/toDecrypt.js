import { useEffect, useState } from "react";

import FileSubmitter from "./fileSubmitter";

import { ApiDaemon } from "../functions/apiDaemon";
import { Bookmarks } from "../functions/bookmarksClass";

export default function ToDecrypt(props) {
  const [formData, setFormData] = useState("");
  const [message, setMessage] = useState("decrypt a file");
  const api = new ApiDaemon();

  useEffect(() => {
    if (formData) {
      apiCall();
    }
  }, [formData]);

  function apiCall() {
    try {
      api
        .decrypt(formData.algorithm, formData.file, formData.key)
        .then((response) => {
          props.bookmarks(new Bookmarks(true, response));
        });
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <>
      <h1>{message}</h1>
      <FileSubmitter data={(formData) => setFormData(formData)} />
    </>
  );
}
