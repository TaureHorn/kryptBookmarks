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
      let sortedData = "";
      try {
        const sortedCategories = this.categorySorter(bookmarksData);
        sortedData = this.linkSorter(sortedCategories);
      } catch (err) {
        console.log(err);
        sortedData = bookmarksData;
      }
      this._bookmarksJSON = sortedData;
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
  categorySorter(categories) {
    const sortedCategories = Object.entries(categories).sort((a, b) => {
      if (a[0].toUpperCase() < b[0].toUpperCase()) {
        return -1;
      }
      if (a[0].toUpperCase() > b[0].toUpperCase()) {
        return 1;
      }
      return 0;
    });
    return sortedCategories;
  }
  linkSorter(bookmarksArr) {
    const sortedLinks = [];
    bookmarksArr.forEach((category) => {
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
    return Object.fromEntries(sortedLinks);
  }
}
