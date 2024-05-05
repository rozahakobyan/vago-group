import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import changeLang from "./helpers/ChangeLanguage"
import {useDispatch, useSelector} from "react-redux";
import {bannerListRequest} from "./store/actions/banner";

function App() {
    const { t } = useTranslation();
    const [lang, setLang] = useState("en");
    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)

    useEffect(() => {
        (async () => {
            const {payload} = await dispatch(bannerListRequest({ active: true }))
        })()
    }, []);

    useEffect(() => {
        changeLang(lang, "title");
    }, [lang]);

    const res = (data) => {
        console.log(data)

        const resources = {
            en: {
                translation: data[1].translation.en
            },
            ru: {
                translation: data[1].translation.ru
            },
            am: {
                translation: data[1].translation.am
            },
            pl: {
                translation: data[1].translation.pl
            },
        }
    }

    return (
        <div>
            <h2>{t("title")}</h2>
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
