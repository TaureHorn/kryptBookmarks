import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Bookmarks } from "../functions/bookmarksClass";
import { dialogCloser } from "../functions/dialogCloser";

export default function Editor(props) {
  const navigate = useNavigate();
  const [editorBookmarks, updateEditorBookmarks] = useState(
    new Bookmarks(true, Object.fromEntries(props.bookmarks.data))
  );
  const [editorMap, updateEditorMap] = useState(
    editorMapper(editorBookmarks.data)
  );
  useEffect(() => {
    updateEditorMap(editorMapper(editorBookmarks.data));
  }, [editorBookmarks]);

  function editorMapper(bookmarks) {
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
                <button
                  className="editButton"
                  onClick={() => deleteCategory(index)}
                >
                  <span
                    className="header"
                    style={{ overflowWrap: "break-word" }}
                  >
                    <strong>delete: {header[0]}</strong>
                  </span>
                </button>
                <button
                  className="editButton"
                  onClick={() => {
                    document.getElementById("entryCategory").value = index;
                    document.getElementById("categoryName").innerHTML =
                      header[0];
                    document.getElementById("entryAdderForm").showModal();
                  }}
                >
                  <strong>ADD NEW ENTRY</strong>
                </button>
                {header[1].map((entry, subindex) => {
                  return (
                    <div id={`${header[0]}-link${subindex}}`} key={uuidv4()}>
                      <button
                        className="editButton"
                        onClick={() => deleteEntry(index, subindex)}
                      >
                        delete: {entry.name}
                      </button>
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

  /////////////////////////// BUTTON FUNCTIONS ///////////////////////////
  function addCategory(e) {
    e.preventDefault();
    const newData = [...editorBookmarks.data];
    newData.push([e.target.categoryName.value.toString(), []]);
    updateEditorBookmarks(new Bookmarks(true, Object.fromEntries(newData)));
    document.getElementById("addCategoryForm").reset();
  }

  function deleteCategory(index) {
    const newData = [...editorBookmarks.data];
    newData.splice(index, 1);
    updateEditorBookmarks(new Bookmarks(true, Object.fromEntries(newData)));
  }
  function addEntry(e) {
    e.preventDefault();
    const newData = [...editorBookmarks.data];
    newData[e.target.entryCategory.value][1].push({
      name: e.target.name.value,
      url: e.target.url.value,
    });
    updateEditorBookmarks(new Bookmarks(true, Object.fromEntries(newData)));
    document.getElementById("newBookmarkEntry").reset();
    document.getElementById("entryAdderForm").close();
  }
  function deleteEntry(index, subindex) {
    const newData = [...editorBookmarks.data];
    newData[index][1].splice(subindex, 1);
    updateEditorBookmarks(new Bookmarks(true, Object.fromEntries(newData)));
  }
  function saveEdits() {
    props.changeBookmarks(editorBookmarks);
    editorBookmarks.writeToStorage();
    navigate("/");
  }
  function discardEdits() {
    navigate("/");
  }

  useEffect(() => {
    dialogCloser("entryAdderForm");
  }, []);

  return (
    <>
      {/*/////////////////// DIALOG ////////////////////////////////*/}
      <dialog id="entryAdderForm">
        <div className="dialogContent">
          <span>add new bookmark to: </span>
          <span
            id="categoryName"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          ></span>
          <form id="newBookmarkEntry" onSubmit={(e) => addEntry(e)}>
            <input
              id="entryCategory"
              name="category"
              type="text"
              style={{ display: "none" }}
            />
            <label>name:</label>
            <input
              className="blackInputText"
              name="name"
              type="text"
              required
            />
            <label> url:</label>
            <input className="blackInputText" name="url" type="url" required />
            <button type="submit" style={{ display: "none" }} />
          </form>
        </div>
      </dialog>
      {/*//////////////////// DATA ////////////////////////////////*/}
      <h1 className="center top">krypt/editor</h1>
      <div className="center middle">
        {editorMap}
        <p className="bigMargin"></p>
        <div className="border blur center translate padding">
          <form
            className="spread"
            id="addCategoryForm"
            name="addCategory"
            onSubmit={(e) => addCategory(e)}
          >
            <label> new category name: </label>
            <input
              className="blackInputText"
              name="categoryName"
              type="text"
              required
            />
            <button id="addCategory" type="submit">
              add new category
            </button>
          </form>
        </div>
      </div>
      <div className="bottom center bottom">
        <button className="biggerButton" onClick={() => discardEdits()}>
          discard changes
        </button>
        <button className="biggerButton" onClick={() => saveEdits()}>
          save edits
        </button>
      </div>
    </>
  );
}
