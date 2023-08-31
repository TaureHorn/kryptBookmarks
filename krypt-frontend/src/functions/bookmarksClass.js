import { objectIsEmpty } from "./objectIsEmpty";

export class Bookmarks {
  constructor(exists, bookmarksJSON) {
    this._exists = exists;
    this._bookmarksJSON = bookmarksJSON;
  }
  checkStatus() {
    if (this._bookmarksJSON) {
      this._exists = true;
    }
  }
  set status(status) {
    typeof status == "boolean"
      ? (this._exists = status)
      : console.log(
          "Bookmarks class has received non boolean data for set status"
        );
  }
  get status() {
    return this._exists;
  }

  set data(data) {
    let bookmarksData = data;
    if (typeof bookmarksData === "string") {
      try {
        bookmarksData = JSON.parse(bookmarksData);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (typeof bookmarksData === "object") {
      this._bookmarksJSON = bookmarksData;
      this.checkStatus();
    }
  }
  get data() {
    return Object.entries(this._bookmarksJSON);
  }
  get dataList() {
    let bookmarksArr = [];
    Object.entries(this._bookmarksJSON).forEach((section) => {
      Array.from(section[1]).forEach((item) => {
        bookmarksArr.push(item);
      });
    });
    return bookmarksArr;
  }
  removeData() {
    document.cookie = "bookmarksStorage=false; sameSite=Strict";
    localStorage.removeItem("bookmarks");
  }
  writeToStorage() {
    window.localStorage.setItem(
      "bookmarks",
      JSON.stringify(this._bookmarksJSON)
    );
  }
}
