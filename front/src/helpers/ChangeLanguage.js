import i18n from "i18next";

function ChangeLanguage(language, text) {
    i18n.changeLanguage(language, (err, t) => {
        if (err) return console.log("something went wrong loading", err);
        t(text);
    });
}

export default ChangeLanguage;