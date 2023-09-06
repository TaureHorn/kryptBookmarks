export async function extractFile(type, file) {
  switch (type) {
    case "text":
      return await extractTextFile(file);
    case "json":
      return await extractJSONfile(file);
    case "image":
      return await extractImageFile(file);
    default:
      return new Error(
        "Called function with incorrect file type: Options [text, json]"
      );
  }
}
async function extractTextFile(file) {
  const fileDataReader = new FileReader();
  fileDataReader.readAsText(file, "UTF-8");
  if (file.type === "") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  } else {
    throw new Error(
      "Error: Incorrect file type. Submit an encrypted text file"
    );
  }
}

async function extractJSONfile(file) {
  const fileDataReader = new FileReader();
  fileDataReader.readAsText(file, "UTF-8");
  if (file.type === "application/json") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        const jsonParseer = JSON.parse(e.target.result);
        resolve(JSON.stringify(jsonParseer));
      };
    });
  } else {
    throw new Error('Error: Incorrect file type >> Submit a json file');
  }
}

async function extractImageFile(file) {
  const formats = ["image/jpg", "image/jpeg", "image/png"];
  const fileDataReader = new FileReader();
  fileDataReader.readAsDataURL(file);
  if (formats.includes(file.type)) {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  } else {
    throw new Error("Error: Incorrect file type. Submit a jpg or png file");
  }
}
