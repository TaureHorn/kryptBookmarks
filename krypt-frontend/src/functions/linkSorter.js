export function linkSorter(bookmarksArr) {
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
  return sortedLinks;
}
