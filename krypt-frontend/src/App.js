import "./App.scss";

import { Bookmarks } from "./functions/bookmarksClass";

import ToDecrypt from "./components/toDecrypt";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

////
import soup from "./media/soup.jpg";
import chickens from "./media/chickens.jpg";
////

export default function App() {
  const [bookmarks, changeBookmarks] = useState(new Bookmarks(false, null));
  document.cookie.includes("bookmarksStorage=true")
    ? (bookmarks.data = localStorage.getItem("bookmarks"))
    : localStorage.removeItem("bookmarks");
  return bookmarks.status ? (
    <>
      <h1>Look at all this data!</h1>
      <img src={chickens} width="128px" />
    </>
  ) : (
    <>
      <img src={soup} width="128px" />
      <ToDecrypt bookmarks={(newBookmarks) => changeBookmarks(newBookmarks)} />
    </>
  );
}
