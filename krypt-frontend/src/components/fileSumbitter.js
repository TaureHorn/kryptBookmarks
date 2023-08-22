export default function FileSubmitter(props) {
  function dataPropHandler(e) {
    e.preventDefault();
    props.data(e.target);
  }

  return (
    <form id="fileSubmitter" onSubmit={(e) => dataPropHandler(e)}>
      <fieldset>
        {/*///////// FILE //////////*/}
        <div id="fileInput">
          <label htmlFor="file">file:</label>
          {props.preloadedFile ? (
            <span name="file">current bookmarks</span>
          ) : (
            <input autoFocus name="file" required type="file" />
          )}
        </div>
        {/*///////// CRYPTOGRAPHIC ALGORITHM //////////*/}
        <div id="algorithmSelector">
          <label htmlFor="algorithm">algorithm:</label>
          <select name="algorithm" required>
            <option value="aes" label="aes" defaultValue />
            <option value="rabbit" label="rabbit" />
            <option value="rc4drop" label="rc4drop" />
          </select>
        </div>
        {/*///////// CRYPTOGRAPHIC KEY //////////*/}
        <div id="keyInput">
          <label htmlFor="key">secret key:</label>
          <input name="key" required type="password" />
        </div>
      </fieldset>
      {/*///////// SUBMIT BUTTON //////////*/}
      <button form="fileSubmitter" type="submit">
        submit
      </button>
    </form>
  );
}
