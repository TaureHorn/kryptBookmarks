import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Map(props) {
  function linkSorter() {
    const sortedLinks = [];
    props.bookmarks.forEach((category) => {
      sortedLinks.push([
        category[0],
        category[1].sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          return 0;
        }),
      ]);
    });
    return sortedLinks;
  }

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
                <span className="mapHeader"> {header[0].toUpperCase()}</span>
                {header[1].map((entry, index) => {
                  return (
                    <div id={`${header[0]}-link${index}`} key={uuidv4()}>
                      <a
                        className="mapLink"
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {entry.name.toUpperCase()}
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  const dataMap = bookmarksMapper(linkSorter());

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
      <div className="center middle">
        {dataMap}
        <p className="bigMargin center highlight translate">
          start typing to search...
        </p>
      </div>
    </>
  );
}
