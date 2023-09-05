import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { ApiDaemon } from "../functions/apiDaemon";
import { Bookmarks } from "../functions/bookmarksClass";

import Map from "./homepage/map";
import Search from "./homepage/search";

export default function Homepage(props) {
  const navigate = useNavigate();
  const api = new ApiDaemon();
  /////////////////////////// SEARCH AND EVENT LISTENER ///////////////////////////
  const [search, toggleSearch] = useState(false);

  return (
    <>
      <h1 className="title">krypt/bookmarks</h1>
      {search ? (
        <Search
          list={props.bookmarks.dataList}
          toggleSearch={(state) => toggleSearch(state)}
        />
      ) : (
        <Map
          bookmarks={props.bookmarks.data}
          toggleSearch={(state) => toggleSearch(state)}
        />
      )}
      {/*/////////////////////////// BUTTONS //////////////////////////////////*/}
      <div id="buttons" className="bottom">
        <button onClick={() => navigate("/editor")}>edit bookmarks</button>
        {/*///////////////////////////////*/}
        <button
          onClick={() => {
            navigate("/encrypt");
          }}
        >
          encrypt a file
        </button>
        {/*///////////////////////////////*/}
        <button
          onClick={() =>
            api.downloader(
              JSON.stringify(props.bookmarks._bookmarksJSON),
              "links",
              "json"
            )
          }
        >
          download unencrypted JSON
        </button>
        {/*///////////////////////////////*/}
        <button
          onClick={() => {
            props.bookmarks.removeData();
            props.changeBookmarks(new Bookmarks(false, null));
          }}
        >
          remove data from memory
        </button>
      </div>
    </>
  );
}
