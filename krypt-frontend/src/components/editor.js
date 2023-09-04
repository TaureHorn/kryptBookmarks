import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Bookmarks } from "../functions/bookmarksClass";

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
        <button
          id="addCategory"
          onClick={() => {
            const form = document.getElementById("addCategoryForm");
            form.style.display = "inline";
          }}
        >
          add new category
        </button>
        <form
          id="addCategoryForm"
          name="addCategory"
          onSubmit={(e) => addCategory(e)}
          style={{ display: "none" }}
        >
          <input name="categoryName" type="text" required />
        </form>

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
                  <span className="header">{header[0]}</span>
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
                  +
                </button>
                {header[1].map((entry, subindex) => {
                  return (
                    <div id={`${header[0]}-link${subindex}}`} key={uuidv4()}>
                      <button
                        className="editButton"
                        onClick={() => deleteEntry(index, subindex)}
                      >
                        {entry.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="editorButtons">
          <p>
            Click on an entry or category to delete it, or click the plus
            buttons to add a new entry or category
          </p>
          <button onClick={() => saveEdits()}>save edits</button>
          <button onClick={() => discardEdits()}>discard changes</button>
        </div>
      </>
    );
  }
  function addCategory(e) {
    e.preventDefault();
    const newData = [...editorBookmarks.data];
    newData.push([e.target.categoryName.value.toString(), []]);
    updateEditorBookmarks(new Bookmarks(true, Object.fromEntries(newData)));
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
  return (
    <>
      {/*/////////////////// DIALOG ////////////////////////////////*/}
      <dialog closed="true" id="entryAdderForm">
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
          <input name="name" type="text" required />
          <label>url:</label>
          <input name="url" type="url" required />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </dialog>
      {/*//////////////////// DATA ////////////////////////////////*/}
      <h1 className="title">edit mode</h1>
      <div className="center">{editorMap}</div>
    </>
  );
}
