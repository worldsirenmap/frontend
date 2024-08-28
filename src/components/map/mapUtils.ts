import {CircleLayer, LineLayer, SymbolLayer} from 'react-map-gl'
import {HoveredState, MarkerState} from '../../config/atoms.ts'
import {FeatureCollection, Point} from 'geojson'
import {FeatureIdentifier, LngLat, MapGeoJSONFeature} from 'maplibre-gl'

export enum PopupContext {
    MAP,
    MARKER,
    LOCKED_MARKER,
    SIREN_SITE,
}

export type PopupState = {
    context: PopupContext
    longitude: number
    latitude: number
}

export type TooltipState = {
    text: string
    longitude: number
    latitude: number
}

export enum PopupAction {
    LOCK_MARKER,
    UNLOCK_MARKER,
    MOVE_TO_CENTER,
    ADD_SIREN_SITE,
    EDIT_SIREN_SITE,
}

export type LocalMarkerState = {
    grabbed?: boolean
    longitude?: number
    latitude?: number
}

export const emptyFeatureCollection = (): FeatureCollection => ({
    type: 'FeatureCollection',
    features: []
})

export const markerFeatureCollection = (markerState: MarkerState, localMarkerState: LocalMarkerState | null): FeatureCollection => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                locked: markerState.locked
            },
            geometry: {
                type: 'Point', coordinates:
                    [
                        localMarkerState?.longitude ? localMarkerState.longitude : markerState.longitude,
                        localMarkerState?.latitude ? localMarkerState.latitude : markerState.latitude,
                    ]
            }
        }
    ]
})


export const hoveredFeatureCollection = (hoveredState: HoveredState): FeatureCollection => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                icon: hoveredState.icon
            },
            geometry: {
                type: 'Point', coordinates:
                    [hoveredState.longitude, hoveredState.latitude]
            }
        }
    ]
})


export const lineFeatureCollection = (hoveredState: HoveredState, markerState: MarkerState, localMarkerState: LocalMarkerState | null): FeatureCollection => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString', coordinates: [
                    [hoveredState.longitude, hoveredState.latitude],
                    [
                        localMarkerState?.longitude ? localMarkerState.longitude : markerState.longitude,
                        localMarkerState?.latitude ? localMarkerState.latitude : markerState.latitude,
                    ],
                ]
            }
        }
    ]
})

export const createHoveredState = (feature: MapGeoJSONFeature): HoveredState => ({
    id: feature.id as number,
    icon: feature.properties.icon,
    longitude: (feature.geometry as Point).coordinates[0],
    latitude: (feature.geometry as Point).coordinates[1],
})

export const createLockedMarkerState = (longitude: number, latitude: number): MarkerState => ({
    locked: true,
    longitude,
    latitude,
})

export const createUnlockedMarkerState = (longitude: number, latitude: number): MarkerState => ({
    locked: false,
    longitude,
    latitude,
})

export const createMarkerPopupState = (feature: MapGeoJSONFeature): PopupState => ({
    longitude: (feature.geometry as Point).coordinates[0],
    latitude: (feature.geometry as Point).coordinates[1],
    context: feature.properties.locked ? PopupContext.LOCKED_MARKER : PopupContext.MARKER
})

export const createSirenPopupState = (feature: MapGeoJSONFeature): PopupState => ({
    longitude: (feature.geometry as Point).coordinates[0],
    latitude: (feature.geometry as Point).coordinates[1],
    context: PopupContext.SIREN_SITE
})

export const createMapPopupState = (coordinates: LngLat): PopupState => ({
    longitude: coordinates.lng,
    latitude: coordinates.lat,
    context: PopupContext.MAP
})

export const createTooltipState = (hoveredState: HoveredState, markerState: MarkerState, localMarkerState: LocalMarkerState | null): TooltipState => {
    const distance = calcDistance(
        hoveredState.latitude,
        hoveredState.longitude,
        localMarkerState?.latitude ? localMarkerState.latitude : markerState.latitude,
        localMarkerState?.longitude ? localMarkerState.longitude : markerState.longitude,
    )

    return {
        text: formatDistanceEU(distance),
        longitude: localMarkerState?.longitude ? localMarkerState.longitude : markerState.longitude,
        latitude: localMarkerState?.latitude ? localMarkerState.latitude : markerState.latitude,
    }
}

export const featureStateId = (id: string | number | undefined) : FeatureIdentifier => ({
    id,
    source: 'sirenmap',
    sourceLayer: 'sirenmap'
})

export const markerLayerDef = (locked: boolean): SymbolLayer => ({
    'id': locked ? 'Marker Locked Layer' : 'Marker Layer',
    'type': 'symbol',
    'layout': {
        'icon-image': locked ? 'general-icons:position-marker-locked' : 'general-icons:position-marker',
        'icon-allow-overlap': true,
        'icon-anchor': 'bottom',
        'icon-size': ['interpolate', ['linear'], ['zoom'], 11, 0.4, 14, 0.6]
    },
    'filter': ['==', 'locked', locked]
})

export const hoveredIconsLayerDef = (): SymbolLayer => ({
    'id': 'Siren Icons Hovered',
    'type': 'symbol',
    'minzoom': 11,
    'layout': {
        'icon-image': ["coalesce", ["image", ["concat", "hovered-siren-marker:", ["get", "icon"]]], ["image", "hovered-siren-marker:missing"]],
        'icon-allow-overlap': true,
        'icon-anchor': 'bottom',
        'icon-size': ['interpolate', ['linear'], ['zoom'], 11, 0.4, 14, 0.8]
    }
})

export const hoveredCirclesLayerDef = (): CircleLayer => ({
    'id': 'Siren Dots Hovered',
    'type': 'circle',
    'maxzoom': 11,
    'paint': {
        'circle-color': 'hsl(14, 89%, 52%)',
        'circle-radius': 5,
    }
})

export const lineLayerDef = (): LineLayer => ({
    'id': 'Distance Lines',
    'type': 'line',
    'layout': {
        'line-cap': 'round'
    },
    'paint': {
        'line-color': '#4E7B9D',
        'line-width': 3,
        'line-opacity': 0.8
    }
})

export const formatDistanceEU = (d: number) => {
    if (d >= 10000) {
        return (d / 1000).toLocaleString(undefined, {maximumFractionDigits: 0}) + ' km'
    } else if (d >= 1000) {
        return (d / 1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + ' km'
    } else {
        return d.toLocaleString(undefined, {maximumFractionDigits: 0}) + ' m'
    }
}

const calcDistance = (lat1c: number, lon1c: number, lat2c: number, lon2c: number) => {
    const R = 6371000; // m
    const dLat = toRad(lat2c - lat1c);
    const dLon = toRad(lon2c - lon1c);
    const lat1 = toRad(lat1c);
    const lat2 = toRad(lat2c);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const toRad = (value: number) => {
    return value * Math.PI / 180
}