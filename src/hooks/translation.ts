import {TOptionsBase} from 'i18next'
import {useTranslation as _useTranslation} from 'react-i18next'
import {$Dictionary} from "i18next/typescript/helpers";

export const translateOptions = (data: { value: string, label: string }[], cb: (label: string) => string) => {
    return data.map(item => ({value: item.value, label: cb(item.label)}))
}

export const useTranslation = () => {
    const {t, ...props} = _useTranslation()
    const regionNames = new Intl.DisplayNames([props.i18n.language], {type: 'region'})
    return {
        t: (key: string, options?: (TOptionsBase & $Dictionary) | undefined) => (key == null || key[0] != "$") ? key : t(key.substring(1), options),
        r: (key: string) => {
            if (!key) return "null";
            if (key.toUpperCase() == "DD") {
                return t("$data.region-codes.DD", "DDR")
            }
            return regionNames.of(key.toUpperCase()) || key
        },
        ...props
    }
}
