import i18n from "i18next";
import callback from "i18next-callback-backend";
import xhr from "i18next-xhr-backend";
import languageDetector from "i18next-browser-languagedetector";

i18n
  .use(callback)
  .use(languageDetector)
  .init({

    customLoad(language,namespace,callback) {
      callback(null, window.require(`./assets/locales/${language}/${namespace}.json`));
    },

    whitelist: ["es","en","ru","fr","it","ge"],
    fallbackLng: "en",

    ns: ["common"],
    defaultNS: "common",

    debug: true,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
