import {atom, useAtom} from 'jotai'
import {atomWithStorage, createJSONStorage} from 'jotai/utils'
import {ViewState} from "react-map-gl/src/types/common.ts";

const currentUserAtom = atomWithStorage("currentUser", {
    authenticated: false,
    username: null
})
export const useUserAtom = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    return {
        username: currentUser.username,
        isUserLoggedIn: currentUser.authenticated,
        setUserLoggedIn: (user: any) => setCurrentUser({
            username: user.username,
            authenticated: true
        }),
        setUserLoggedOut: () => setCurrentUser({
            username: null,
            authenticated: false
        })
    }
}
// ---------- LibraryAtom ----------
export type LibraryTag = string
export type LibraryModel = {
    id: number
    shortname: string
    manufacturer: string
    category: string
    icon: string
}
export type LibraryManufacturer = {
    id: number
    shortname: string
}
export type Library = {
    tags: LibraryTag[]
    models: LibraryModel[]
    manufacturers: LibraryManufacturer[]
}
const initialLibraryState: Library = {
    tags: [],
    models: [],
    manufacturers: []
}
const libraryAtom = atom<Library>(initialLibraryState)
export const useLibraryAtom = () => {
    const [library, setLibrary] = useAtom(libraryAtom)
    return {
        tags: library.tags,
        models: library.models,
        manufacturers: library.manufacturers,
        setTags: (tags: LibraryTag[]) => setLibrary(current => ({...current, tags})),
        setModels: (models: LibraryModel[]) => setLibrary(current => ({...current, models})),
        setManufacturers: (manufacturers: LibraryModel[]) => setLibrary(current => ({...current, manufacturers})),
    }
}

// ---------- FilterAtom ----------
export type MapFilter = {
    tag: string[]
    mod: number[]
    man: number[]
    cat: string[]
    con: string[]
}

export const emptyMapFilter: MapFilter = {
    tag: [],
    mod: [],
    man: [],
    cat: [],
    con: []
}
const mapFilterAtom = atomWithStorage<MapFilter>('mapFilter', emptyMapFilter, createJSONStorage(), {getOnInit: true})
export const useMapFilterAtom = () => {
    const [mapFilter, setMapFilter] = useAtom(mapFilterAtom)
    return {
        isFilterActive: mapFilter.tag.length || mapFilter.mod.length || mapFilter.man.length || mapFilter.cat.length || mapFilter.con.length,
        mapFilter,
        setMapFilter,
        resetMapFilter: () => setMapFilter(emptyMapFilter)
    }
}

export const mapFilter2JsonQuery = (mapFilter: MapFilter): string => {
    const urlParams = []
    if (mapFilter.tag.length > 0) urlParams.push("tag=[" + mapFilter.tag.map(x => '"' + x + '"').join() + "]")
    if (mapFilter.mod.length > 0) urlParams.push("mod=[" + mapFilter.mod.join() + "]")
    if (mapFilter.man.length > 0) urlParams.push("man=[" + mapFilter.man.join() + "]")
    if (mapFilter.cat.length > 0) urlParams.push("cat=[" + mapFilter.cat.map(x => '"' + x + '"').join() + "]")
    if (mapFilter.con.length > 0) urlParams.push("con=[" + mapFilter.con.map(x => '"' + x + '"').join() + "]")
    return urlParams.length == 0 ? "" : "?" + urlParams.join('&')
}

export const mapFilter2QueryString = (mapFilter: MapFilter): string => {
    const urlParams = []
    if (mapFilter.tag.length > 0) urlParams.push("tag=" + mapFilter.tag.join())
    if (mapFilter.mod.length > 0) urlParams.push("mod=" + mapFilter.mod.join())
    if (mapFilter.man.length > 0) urlParams.push("man=" + mapFilter.man.join())
    if (mapFilter.cat.length > 0) urlParams.push("cat=" + mapFilter.cat.join())
    if (mapFilter.con.length > 0) urlParams.push("con=" + mapFilter.con.join())
    return urlParams.length == 0 ? "" : "?" + urlParams.join('&')
}

// ---------- ShowModalAtom ----------
const showModalAtom = atom("")
export const useModalAtom = () => {
    const [showModal, setShowModal] = useAtom(showModalAtom)
    return {
        isModalOpen: (name: string) => showModal == name,
        openModal: (name: string) => setShowModal(name),
        closeModal: () => setShowModal("")
    }
}

// ---------- SideBarState ----------
const showSidebarAtom = atomWithStorage<boolean>('sidebarState', false, createJSONStorage(), {getOnInit: true})
export const useSidebarAtom = () => {
    const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom)
    return {
        isSidebarOpen: showSidebar,
        openSidebar: () => setShowSidebar(true),
        closeSidebar: () => setShowSidebar(false)
    }
}

// ---------- MapViewState ----------
const initialViewState: ViewState = {
    bearing: 0,
    padding: {top: 0, bottom: 0, left: 0, right: 0},
    pitch: 0,
    longitude: 8.133522590488898,
    latitude: 50.25649427798203,
    zoom: 10
}
const mapViewStateAtom = atomWithStorage('mapViewState', initialViewState, createJSONStorage(), {getOnInit: true})
export const useViewState = () => useAtom(mapViewStateAtom)

// ---------- MarkerState ----------
export type MarkerState = {
    locked: boolean,
    longitude: number,
    latitude: number,
}

const initialMarkerState: MarkerState = {
    locked: false,
    longitude: initialViewState.longitude,
    latitude: initialViewState.latitude,
}
const markerStateAtom = atomWithStorage<MarkerState>('markerState', initialMarkerState, createJSONStorage(), {getOnInit: true})
export const useMarkerState = () => useAtom(markerStateAtom)

// ---------- HoveredState ----------
export type HoveredState = {
    id: number,
    icon: string,
    longitude: number,
    latitude: number,
}
const hoveredStateAtom = atom<HoveredState | null>(null)
export const useHoveredState = () => useAtom(hoveredStateAtom)

// ---------- Loading ----------
const loadingAtom = atom<boolean>(false)
export const useLoading = () => useAtom(loadingAtom)