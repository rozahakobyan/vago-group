import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bannerListRequest} from "./store/actions/banner";

function App() {
    const [lang, setLang] = useState("en");
    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, []);

    return (
        <div>
            {bannersList && bannersList.map(l => (
             <h2>{l.translation[lang].title}</h2>)
            )}
            <button
                onClick={() => {
                    setLang("en");
                }}
            >
                En
            </button>
            <button
                onClick={() => {
                    setLang("pl");
                }}
            >
                Pl
            </button>
        </div>
    );
}

export default App;
