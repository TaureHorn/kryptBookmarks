import "./App.scss";

import { ApiDaemon } from "./apiDaemon";
import { Bookmarks } from "./functions/bookmarks";

import ToDecrypt from "./components/toDecrypt";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
 
////
import soup from "./media/nosoup.jpg";
import chickens from "./media/chickens.jpg";
import links from "./media/links.json"; // testing data only
////

export default function App() {
  const bookmarks = new Bookmarks(false, null);
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
      <ToDecrypt />
    </>
  );
}
