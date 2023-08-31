import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// TODO map through bookmars data WITHOUT handing off to another component
// add ability to add and remove whole bookmark categories this time

export default function Map(props) {
  const bookmarks = props.bookmarks.data;
  const [editMode, changeEditMode] = useState(false);
  const [dataMap, updateDataMap] = useState("");

  useEffect(() => {
    updateDataMap(bookmarksMapper(bookmarks, editMode));
  }, [editMode]);

  console.log("bookmarks", bookmarks);
  function bookmarksMapper(bookmarks, editMode) {
    return editMode ? (
      <>
        <button onClick={() => addCategory()}>+</button>
        {bookmarks.map((header, index) => {
          return (
            <div id={`${header[0]}-section${index}`} key={uuidv4()}>
              <button onClick={() => deleteCategory(header[0])}>X</button>
              <span className="header">{header[0]}</span>
              <button onClick={() => addEntry()}>+</button>
              {header[1].map((entry, index) => {
                return (
                  <div id={`${header[0]}-link${index}}`} key={uuidv4()}>
                    <button onClick={() => deleteEntry(index, entry.name)}>
                      {entry.name}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
        <button onClick={() => toggleEditMode()}>save edits</button>
      </>
    ) : (
      <>
        {bookmarks.map((header, index) => {
          return (
            <div id={`${header[0]}-section${index}`} key={uuidv4()}>
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
        <button onClick={() => toggleEditMode()}>enable edit mode</button>
      </>
    );
  }
  function addCategory() {
    // TODO add category addition functionality
    console.log(`Triggered to add a category`);
  }
  function deleteCategory(section) {
    // TODO add category deletion functionality
    console.log(`Triggered to delete category ${section}`);
  }
  function addEntry(section) {
    // TODO add entry addtion functionality
    console.log(`Triggered to add an entry to ${section}`);
  }
  function deleteEntry(index, name) {
    // TODO add entry deletion functionality
    console.log(`Selected ${index}: entry ${name} is set for deletion`);
  }
  function toggleEditMode() {
    if (editMode === false) {
      changeEditMode(true);
    } else if (editMode === true) {
      // TODO add functionality to push current state of bookmarks up component chain and save new ones to localstorage
      changeEditMode(false);
    }
  }
  return (
    <>
      <h2>
        {editMode ? (
          <>edit mode enabled: click save button to save and exit</>
        ) : (
          <></>
        )}
      </h2>
      <div className="center">{dataMap}</div>
    </>
  );
}
