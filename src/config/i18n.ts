import i18n from 'i18next'
import Backend, {HttpBackendOptions} from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        fallbackLng: 'en',
        supportedLngs: ['de', 'en'],
        ns: ['wsm'],
        defaultNS: 'wsm',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // Backend
        load: 'languageOnly',
        backend: {
            loadPath: import.meta.env.VITE_WSM_SERVER_URL + "/assets/translations/{{lng}}/{{ns}}.json"
        }
    });