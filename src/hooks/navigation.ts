import {useEffect} from "react";
import {atom, useAtom, useAtomValue} from "jotai";

const navigateEvent = "wsmNavigate"

declare global {
    interface Window {
        wsmRouterPatch: boolean
    }
}

if (typeof history !== "undefined" && !window.wsmRouterPatch) {
    const original = history.replaceState;
    history.replaceState = function (data: unknown, unused: string, url?: string | URL | null) {
        const result = original.apply(this, [data, unused, url])
        dispatchEvent(new Event(navigateEvent))
        return result
    }
    window.wsmRouterPatch = true
}

const trimPath = (path: string) => path.replace(/^\/+|\/+$/g, '').replace(/\/{2,}/, '/').toLowerCase()
const trimSplitPath = (path: string) => trimPath(path).length === 0 ? null : trimPath(path).split("/")

const urlAtom = atom(trimSplitPath(window.location.pathname))

export const useUrlParams = (): string[] => {
    const url = useAtomValue(urlAtom)
    return (url == null || url.length === 1) ? [] : url.slice(1)
}

export const useRouter = () => {
    const [url, setUrl] = useAtom(urlAtom)

    useEffect(() => {
        const onNavigate = () => {
            setUrl(trimSplitPath(window.location.pathname))
        }

        window.addEventListener(navigateEvent, onNavigate)
        return () => window.removeEventListener(navigateEvent, onNavigate)
    }, [setUrl])

    return (...path: (string | RegExp | boolean)[]) => {
        if (path == null || path.length === 0) {
            return false
        }
        if (url == null || path.length < url.length) {
            return false
        }
        return path.every((pathEntry, index) => {
            const urlEntry = url[index] ?? undefined
            if (typeof pathEntry === 'string') {
                return urlEntry !== undefined && pathEntry.toLowerCase() === urlEntry.toLowerCase()
            } else if (typeof pathEntry === 'boolean') {
                return urlEntry !== undefined || !pathEntry
            } else {
                return pathEntry.test(urlEntry)
            }
        })
    }
}

export const useNavigation = () => {
    return (...to: string[]) => {
        const path = (to == null || to.length === 0) ? "" : trimPath(to.join("/"))
        window.history.replaceState(null, "", "/" + path)
    }
}