export function dialogCloser(id) {
  let dialogChecker = () => {
    return;
  };
  try {
    if (document.getElementById(id) !== null) {
      dialogChecker = (event: MouseEvent) => {
        if (event.target.nodeName === "DIALOG") {
          document.getElementById(id).close();
        }
      };
    }
  } catch (error) {
    console.error(error);
    console.log(error.message);
  }
  document.addEventListener("click", dialogChecker);
  return () => {
    document.removeEventListener("click", dialogChecker);
  };
}
