import { useState } from "react";

import { extractFile } from "../functions/fileDataHandler";

export default function FileSubmitter(props) {
    // props = {
    //    data: 'change parent components formData variable state based on form data'
    //    fileType: 'parent component dictates which file type to take'
    // }
    const [errMsg, setErrMsg] = useState("");

    async function dataPropHandler(e) {
        e.preventDefault();
        try {
            let parsedFile = "";
            if (props.preloadedFile === false || !props.preloadedFile) {
                parsedFile = await extractFile(props.fileType, e.target[1].files[0]);
            }
            const data = {
                file: props.preloadedFile ? props.bookmarks : parsedFile,
                algorithm: e.target.algorithm.value,
                key: e.target.key.value,
            };
            props.data(data);
        } catch (err) {
            setErrMsg(err.message);
        }
    }

    return (
        <>
            <form
                className="form"
                id="fileSubmitter"
                onSubmit={(e) => dataPropHandler(e)}
            >
                <fieldset className="spread">
                    {/*///////// FILE //////////*/}
                    <label htmlFor="file">file:</label>
                    {props.preloadedFile ? (
                        <span name="file">current bookmarks</span>
                    ) : (
                        <input autoFocus name="file" required type="file" />
                    )}
                    {/*///////// CRYPTOGRAPHIC ALGORITHM //////////*/}
                    <label htmlFor="algorithm"> algorithm:</label>
                    <select name="algorithm" required>
                        <option value="aes" label="aes" defaultValue />
                        <option value="rabbit" label="rabbit" />
                        <option value="rc4drop" label="rc4drop" />
                    </select>
                    {/*///////// CRYPTOGRAPHIC KEY //////////*/}
                    <label htmlFor="key"> secret key:</label>
                    <input
                        className="blackInputText"
                        name="key"
                        placeholder="*********"
                        required
                        type="password"
                    />
                </fieldset>
                {/*///////// SUBMIT BUTTON //////////*/}
                {errMsg ? <span className="alert formAlert">{errMsg}</span> : <></>}
                <button className="biggerButton formSubmit" form="fileSubmitter" type="submit">
                    submit
                </button>
            </form>
        </>
    );
}
