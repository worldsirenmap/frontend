import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                header: {
                    btn_types: 'Siren types',
                    btn_manufacturers: 'Siren manufacturers',
                    btn_addsite: 'Add siren site',
                }
            },
            de: {
                header: {
                    btn_types: 'Sirenentypen',
                    btn_manufacturers: 'Hersteller',
                    btn_addsite: 'Standort hinzufügen',
                }
            }
        }
    });