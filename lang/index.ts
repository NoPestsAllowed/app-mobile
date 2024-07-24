import { getLocales, getCalendars } from "expo-localization";
import { I18n } from "i18n-js";
import { en } from "./en";
import { fr } from "./fr";

const translations = {
    en,
    fr
}
const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

export const $t = (stringToTranslate: string, rest?: object) => {
    console.log(rest);

    return i18n.t(stringToTranslate, {...rest})
}
