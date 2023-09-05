import "./App.scss";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Bookmarks } from "./functions/bookmarksClass";

import Config from "./components/config";
import Editor from "./components/editor";
import Encrypter from "./components/encrypter";
import Homepage from "./components/homepage";
import ToDecrypt from "./components/toDecrypt";

export default function App() {
  const [bookmarks, changeBookmarks] = useState(new Bookmarks(false, null));
  document.cookie.includes("bookmarksStorage=true")
    ? (bookmarks.data = localStorage.getItem("bookmarks"))
    : localStorage.clear();

  const [config, toggleConfig] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("backgroundImage")) {
      document.getElementsByTagName(
        "body"
      )[0].style.backgroundImage = `url(${window.localStorage.getItem(
        "backgroundImage"
      )})`;
    }
  }, []);

  return (
    <>
      {config ? (
        <Config toggleConfig={(state) => toggleConfig(state)} />
      ) : (
        <>
          <button onClick={() => toggleConfig(true)}>[]</button>
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            bookmarks.status ? (
              <>
                <Homepage
                  bookmarks={bookmarks}
                  changeBookmarks={(newBookmarks) =>
                    changeBookmarks(newBookmarks)
                  }
                />
              </>
            ) : (
              <>
                <ToDecrypt
                  bookmarks={(newBookmarks) => changeBookmarks(newBookmarks)}
                />
              </>
            )
          }
        />
        <Route
          path="/editor"
          element={
            <Editor
              bookmarks={bookmarks}
              changeBookmarks={(newBookmarks) => changeBookmarks(newBookmarks)}
            />
          }
        />
        <Route path="/encrypt" element={<Encrypter bookmarks={bookmarks} />} />
      </Routes>
    </>
  );
}
