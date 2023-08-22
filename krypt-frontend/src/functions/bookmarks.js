import { objectIsEmpty } from "./objectIsEmpty";

export class Bookmarks {
  constructor(exists, bookmarksJSON) {
    this._exists = exists;
    this._bookmarksJSON = bookmarksJSON;
  }
  checkStatus() {
    if (this._bookmarksJSON !== undefined) {
      this.status = true;
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
  set data(obj) {
    if (typeof obj === "string" && obj.length > 0) {
      let object = {};
      try {
        object = JSON.parse(obj);
      } catch (error) {
        console.log("JSON.parse failed while trying to set bookmarks data");
        console.log(error);
      }
      typeof object === "object" && objectIsEmpty(object) === false
        ? (this._bookmarksJSON = object)
        : console.log(
            "JSON.parse did not produce a valid object while trying to set booksmarks data"
          );
    } else {
      console.log(
        "Bookmarks data cannot be set to empty string or non string value"
      );
      return;
    }
    this.checkStatus();
  }
  get data() {
    return this._bookmarksJSON;
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
}
