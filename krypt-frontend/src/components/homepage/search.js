import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    function formSubmit(e) {
        e.preventDefault();
        setSearchTerm(e.target.fzf.value);
        document.getElementById("result0").focus();
    }
    const fuse = new Fuse(props.list, {
        keys: ["name"],
        includeScore: true,
    });

    const results = fuse.search(searchTerm).map((query, index) => {
        let url = query.item.url.includes("https")
            ? query.item.url.slice(8, 38)
            : query.item.url.slice(7, 37);
        if (url.length >= 30) {
            url += "...";
        }
        return (
            <div key={`searchResult${index}`}>
                <a
                    className="searchLink"
                    id={`result${index}`}
                    href={query.item.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => props.toggleSearch(false)}
                >
                    <div id={query.item.name} className="spread">
                        <div>
                            <span>[{query.score.toString().slice(1, 4)}] | </span>
                            <span className="searchResult">
                                {query.item.name.toUpperCase()}
                            </span>
                        </div>
                        <span>{url}</span>
                    </div>
                </a>
            </div>
        );
    });

    /////////////////////////// EVENT LISTENER ///////////////////////////
    useEffect(() => {
        const keyPressChecker = (event: KeyboardEvent) => {

            if (event.key === "Escape") {
                props.toggleSearch(false);
            }

            // navigate through results with up and down arrows
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                const down = event.key === "ArrowDown" ? true : false
                const act = document.activeElement
                const elementList = Object.values(document.getElementsByClassName("searchLink"))

                if (elementList.includes(act)) {
                    // focus the next / previous result elememnt
                    const currentIndex = parseInt(act.id.toString().slice(6))
                    let targetIndex
                    if (down) {
                        targetIndex = currentIndex + 1 === elementList.length ? 0 : currentIndex + 1
                    } else {
                        targetIndex = currentIndex - 1 < 0 ? elementList.length - 1 : currentIndex - 1
                    }
                    elementList[targetIndex].focus()
                } else {
                    // focus the first result element if a result element is not focussed
                    elementList[0].focus()
                }
            }
        };
        document.addEventListener("keydown", keyPressChecker);
        return () => {
            document.removeEventListener("keydown", keyPressChecker);
        };
    }, []);

    return (
        <div className="border blur center search">
            <form
                className="searchField"
                id="fzfform"
                onSubmit={(e) => formSubmit(e)}
            >
                <input
                    className="searchField"
                    autoFocus
                    id="fzf"
                    name="fzf"
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            {results}
        </div>
    );
}
