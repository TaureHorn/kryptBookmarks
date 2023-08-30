import "./App.scss";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Bookmarks } from "./functions/bookmarksClass";

import Homepage from "./components/homepage";
import ToDecrypt from "./components/toDecrypt";

export default function App() {
  const [bookmarks, changeBookmarks] = useState(new Bookmarks(false, null));
  const [preloadFile, togglePreloadFile] = useState(false);
  document.cookie.includes("bookmarksStorage=true")
    ? (bookmarks.data = localStorage.getItem("bookmarks"))
    : localStorage.removeItem("bookmarks");
  return (
    <>
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
                  preloadFile={(state) => togglePreloadFile(state)}
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
        <Route path="/encrypt" element={<></>} />
      </Routes>
    </>
  );
}
