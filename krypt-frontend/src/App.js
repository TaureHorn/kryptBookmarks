import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Bookmarks } from "./functions/bookmarksClass";

import Config from "./components/config";
import Editor from "./components/editor";
import Encrypter from "./components/encrypter";
import Homepage from "./components/homepage";
import ToDecrypt from "./components/toDecrypt";

import SidebarToggler from "./resources/sidebar.svg";

export default function App() {
    const [bookmarks, changeBookmarks] = useState(new Bookmarks(false, null));
    document.cookie.includes("bookmarksStorage=true")
        ? (bookmarks.data = localStorage.getItem("bookmarks"))
        : localStorage.clear();

    useEffect(() => {
        if (window.localStorage.getItem("backgroundImage")) {
            document.getElementsByTagName("body")[0].style.backgroundImage = `url(${window.localStorage.getItem("backgroundImage")})`;
        }
        if (window.localStorage.getItem("customColors")) {
            const customColors = JSON.parse(window.localStorage.getItem("customColors"))
            for (const key in customColors) {
                let cssTarget = ''
                switch (key) {
                    case 'main-color': cssTarget = '--main-col'; break;
                    case 'hi-color': cssTarget = '--hi-col'; break;
                    case 'bg-color': cssTarget = '--bg-col'; break;
                }
                document.querySelector(':root').style.setProperty(cssTarget, customColors[key])
            }
        }
    }, []);

    return (
        <>
            <img
                alt="sidebar toggler"
                className="sidebarToggler"
                draggable="false"
                onClick={() => document.getElementById("configDialog").showModal()}
                src={SidebarToggler}
            />
            <Config />
            <Routes>
                <Route
                    path="/"
                    element={
                        bookmarks.status ? (
                            <>
                                <Homepage
                                    bookmarks={bookmarks}
                                    changeBookmarks={(newBookmarks) =>
                                        changeBookmarks(newBookmarks)
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <ToDecrypt
                                    bookmarks={(newBookmarks) => changeBookmarks(newBookmarks)}
                                />
                            </>
                        )
                    }
                />
                <Route
                    path="/editor"
                    element={
                        <Editor
                            bookmarks={bookmarks}
                            changeBookmarks={(newBookmarks) => changeBookmarks(newBookmarks)}
                        />
                    }
                />
                <Route path="/encrypt" element={<Encrypter bookmarks={bookmarks} />} />
            </Routes>
        </>
    );
}
