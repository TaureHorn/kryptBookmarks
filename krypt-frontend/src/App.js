import "./App.scss";
import { ApiDaemon } from "./apiDaemon";
import { Bookmarks } from "./functions/bookmarks";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import soup from "./resources/nosoup.jpg";
import chickens from "./resources/chickens.jpg";
import links from "./links.json"; // testing data only

export default function App() {
  const bookmarks = new Bookmarks(false, null, null);
  function test() {
    bookmarks.data = JSON.stringify(links);
  }
  test();
  return bookmarks.status ? (
    <>
      <h1>Look at all this data!</h1>
      {console.log(bookmarks.data)}
      <img src={chickens} width="256px" />
    </>
  ) : (
    <>
      <h1>No bookmarks for you!</h1>
      <img src={soup} width="256px" />
    </>
  );
}
