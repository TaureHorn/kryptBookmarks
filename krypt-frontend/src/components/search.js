import { useState } from "react";
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
          id={`result${index}`}
          href={query.item.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => props.search(false)}
        >
          <span>{query.score.toString().slice(1, 4)}</span>
          <span>{query.item.name}</span>
          <span>{url}</span>
        </a>
      </div>
    );
  });
  return (
    <>
      <form id="fzfform" onSubmit={(e) => formSubmit(e)}>
        <input
          autoFocus
          id="fzf"
          name="fzf"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {results}
    </>
  );
}
