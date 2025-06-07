import {atom, useAtom} from 'jotai'
import {atomWithStorage, createJSONStorage} from 'jotai/utils'
import {ViewState} from "react-map-gl/src/types/common.ts";

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