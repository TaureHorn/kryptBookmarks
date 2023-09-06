import { useEffect } from "react";

import { dialogCloser } from "../functions/dialogCloser";
import { extractFile } from "../functions/fileDataHandler";

export default function Config() {
  async function backgroundSetter(e) {
    e.preventDefault();
    const base64Image = await extractFile("image", e.target.files[0]);
    window.localStorage.setItem("backgroundImage", base64Image);
    document.getElementsByTagName(
      "body"
    )[0].style.backgroundImage = `url(${base64Image})`;
  }

  useEffect(() => {
    dialogCloser('configDialog');
  }, []);

  return (
    <dialog id="configDialog">
      <div className="dialogContent">
        <span className="mapHeader">CONFIG</span>
        <form id="imageGetter" onChange={(e) => backgroundSetter(e)}>
          <label>Background image: </label>
          <input accept="image/*" name="image" type="file" required />
        </form>
      </div>
    </dialog>
  );
}
