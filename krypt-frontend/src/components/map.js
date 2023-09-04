import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


export default function Map(props) {
  const navigate = useNavigate();
  const dataMap = bookmarksMapper(props.bookmarks);

  function bookmarksMapper(bookmarks) {
    return (
      <>
        <div className="inline">
          {bookmarks.map((header, index) => {
            return (
              <div
                id={`${header[0]}-section${index}`}
                key={uuidv4()}
                className="border map padding"
              >
                <span className="header">{header[0]}</span>
                {header[1].map((entry, index) => {
                  return (
                    <div id={`${header[0]}-link${index}`} key={uuidv4()}>
                      <a href={entry.url} target="_blank" rel="noreferrer">
                        {entry.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="editorButtons">
          <p>Or, start typing to search...</p>
        </div>
      </>
    );
  }

  /////////////////////////// EVENT LISTENER ///////////////////////////
  useEffect(() => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const keyPressChecker = (event: KeyboardEvent) => {
      if (characters.includes(event.key)) {
        props.toggleSearch(true);
      }
    };
    document.addEventListener("keydown", keyPressChecker);
    return () => {
      document.removeEventListener("keydown", keyPressChecker);
    };
  });
  return (
    <>
      <div className="center">{dataMap}</div>
    </>
  );
}
