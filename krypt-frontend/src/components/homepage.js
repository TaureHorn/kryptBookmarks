import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { ApiDaemon } from "../functions/apiDaemon";
import { Bookmarks } from "../functions/bookmarksClass";

import Map from "./map";
import Search from "./search";

export default function Homepage(props) {
  const [title, setTitle] = useState("krypt");
  const [deleteMode, toggleDeleteMode] = useState(false);
  const navigate = useNavigate();
  const api = new ApiDaemon();
  /////////////////////////// SEARCH AND EVENT LISTENER ///////////////////////////
  const [search, toggleSearch] = useState(false);
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  document.addEventListener("keydown", (event) => {
    if (characters.includes(event.key)) {
      toggleSearch(true);
    } else if (event.key === "Escape" && search === true) {
      toggleSearch(false);
    }
  });

  return (
    <>
      <h1>{deleteMode ? <>delete mode enabled</> : <>{title}</>}</h1>
      {search ? (
        <Search
          list={props.bookmarks.dataList}
          search={(state) => toggleSearch(state)}
        />
      ) : (
        <Map />
      )}
      {/*/////////////////////////// BUTTONS //////////////////////////////////*/}
      <button
        onClick={() => {
          props.preloadFile(true);
          navigate("/encrypt");
        }}
      >
        encrypt current bookmarks
      </button>

      <button
        onClick={() => {
          props.preloadFile(false);
          navigate("/encrypt");
        }}
      >
        encrypt new file
      </button>

      <button
        onClick={() => {
          deleteMode ? toggleDeleteMode(false) : toggleDeleteMode(true);
        }}
      >
        {deleteMode ? <>disable</> : <>enable</>} delete mode
      </button>
      <button onClick={() => api.downloader()}>
        download unencrypted JSON
      </button>

      <button
        onClick={() => {
          props.bookmarks.removeData();
          props.changeBookmarks(new Bookmarks(false, null));
        }}
      >
        remove data from memory
      </button>
    </>
  );
}
