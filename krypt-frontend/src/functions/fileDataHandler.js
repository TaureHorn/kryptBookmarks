export function extractFile(file) {
  const fileDataReader = new FileReader();
  fileDataReader.readAsText(file, "UTF-8");
  if (file.type === "text/plain" || file.type === "") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  } else if (file.type === "application/json") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        const jsonParser = JSON.parse(e.target.result);
        resolve(JSON.stringify(jsonParser));
      };
    });
  }
}
