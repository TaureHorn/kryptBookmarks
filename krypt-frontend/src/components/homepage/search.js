import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  function formSubmit(e) {
    e.preventDefault();
    setSearchTerm(e.target.fzf.value);
    document.getElementById("result0").focus();
  }
  const fuse = new Fuse(props.list, {
    keys: ["name"],
    includeScore: true,
  });

  const results = fuse.search(searchTerm).map((query, index) => {
    let url = query.item.url.includes("https")
      ? query.item.url.slice(8, 38)
      : query.item.url.slice(7, 37);
    if (url.length >= 30) {
      url += "...";
    }
    return (
      <div key={`searchResult${index}`}>
        <a
          className="searchLink"
          id={`result${index}`}
          href={query.item.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => props.toggleSearch(false)}
        >
          <div id={query.item.name} className="spread">
            <div>
              <span>[{query.score.toString().slice(1, 4)}] | </span>
              <span className="searchResult">
                {query.item.name.toUpperCase()}
              </span>
            </div>
            <span>{url}</span>
          </div>
        </a>
      </div>
    );
  });

  /////////////////////////// EVENT LISTENER ///////////////////////////
  useEffect(() => {
    const keyPressChecker = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.toggleSearch(false);
      }
    };
    document.addEventListener("keydown", keyPressChecker);
    return () => {
      document.removeEventListener("keydown", keyPressChecker);
    };
  }, []);

  return (
    <div className="border center search">
      <form
        className="searchField"
        id="fzfform"
        onSubmit={(e) => formSubmit(e)}
      >
        <input
          className="searchField"
          autoFocus
          id="fzf"
          name="fzf"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {results}
    </div>
  );
}
