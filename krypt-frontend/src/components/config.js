import { extractFile } from "../functions/fileDataHandler";

export default function Config(props) {
  async function backgroundSetter(e) {
    e.preventDefault();
    const base64Image = await extractFile("image", e.target.files[0]);
    window.localStorage.setItem("backgroundImage", base64Image);
    document.getElementsByTagName(
      "body"
    )[0].style.backgroundImage = `url(${base64Image})`;
  }

  return (
    <aside className='sidebar'>
      <button onClick={() => props.toggleConfig(false)}>[]</button>
      <form
        id="imageGetter"
        onChange={(e) => backgroundSetter(e)}
      >
        <label>Background image: </label>
        <input accept="image/*" name="image" type="file" required />
      </form>
    </aside>
  );
}
