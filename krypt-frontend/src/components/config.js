import { useEffect } from "react";

import { dialogCloser } from "../functions/dialogCloser";
import { extractFile } from "../functions/fileDataHandler";

export default function Config() {
    async function backgroundSetter(e) {
        e.preventDefault();

        // set background to image
        if (e.target[1].files[0]) {
            const base64Image = await extractFile("image", e.target[1].files[0]);
            window.localStorage.setItem("backgroundImage", base64Image);
            document.getElementsByTagName("body")[0].style.backgroundImage = `url(${base64Image})`;
        }

        // change css custom property colors
        const colorsArr = Array.from(e.target).filter(item => item.type === "color")
        const customColors = {}
        colorsArr.forEach(input => {
            let cssTarget = ''
            switch(input.name) {
                case 'main-color': cssTarget = '--main-col'; break;
                case 'hi-color': cssTarget = '--hi-col'; break;
                case 'bg-color': cssTarget = '--bg-col'; break;
            }
            customColors[input.name] = input.value
            document.querySelector(':root').style.setProperty(cssTarget, input.value)
        })
        window.localStorage.setItem("customColors", JSON.stringify(customColors))
    }

    useEffect(() => {
        dialogCloser('configDialog');
    }, []);

    return (
        <dialog id="configDialog">
            <div className="dialogContent">
                <span className="mapHeader">CONFIG</span>
                <form id="imageGetter" onSubmit={(e) => backgroundSetter(e)}>
                    <fieldset>
                        <label>Background image: </label>
                        <input accept="image/*" name="image" type="file" />
                    </fieldset>
                    <fieldset style={{ alignItems: 'center', display: 'flex', gap: 'var(--padding)' }}>
                        <label>Main color: </label>
                        <input type="color" name="main-color" />
                        <label>Highlight color: </label>
                        <input type="color" name="hi-color" />
                        <label>Background color: </label>
                        <input type="color" name="bg-color" />
                    </fieldset>
                    <fieldset>
                        <button className="biggerButton formSubmit" type="submit">submit</button>
                    </fieldset>
                </form>
            </div>
        </dialog>
    );
}
