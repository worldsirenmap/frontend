import {Button, Stack, Text} from '@mantine/core';
import Map, {
    Layer,
    MapLayerMouseEvent,
    MapRef,
    NavigationControl,
    Popup,
    Source,
    VectorTileSource,
    ViewStateChangeEvent
} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHoveredState, useMarkerState, useViewState} from '../../config/atoms.ts';
import {
    createHoveredState,
    createLockedMarkerState,
    createMapPopupState,
    createMarkerPopupState,
    createSirenPopupState,
    createTooltipState,
    createUnlockedMarkerState,
    emptyFeatureCollection,
    featureStateId,
    hoveredCirclesLayerDef,
    hoveredFeatureCollection,
    hoveredIconsLayerDef,
    lineFeatureCollection,
    lineLayerDef,
    LocalMarkerState,
    markerFeatureCollection,
    markerLayerDef,
    PopupAction,
    PopupContext,
    PopupState
} from './mapUtils.ts';
import {CircleLayer, LineLayer, SymbolLayer} from "react-map-gl";
import {MapGeoJSONFeature} from "maplibre-gl";
import {mapFilter2JsonQuery, useMapFilter} from "../../config/mapFilter.ts";

export default () => {
    const mapRef = useRef<MapRef | null>(null)

    const [viewState, setViewState] = useViewState()
    const [markerState, setMarkerState] = useMarkerState()
    const [hoveredState, setHoveredState] = useHoveredState()
    const {currentFilter} = useMapFilter()

    const [popupState, setPopupState] = useState<PopupState | null>(null)
    const [localMarkerState, setLocalMarkerState] = useState<LocalMarkerState | null>(null)
    const [cursor, setCursor] = useState<string>('')

    const lineLayer = useMemo<LineLayer>(() => lineLayerDef(), [])
    const markerLayer = useMemo<SymbolLayer>(() => markerLayerDef(false), [])
    const markerLockedLayer = useMemo<SymbolLayer>(() => markerLayerDef(true), [])
    const hoveredIconsLayer = useMemo<SymbolLayer>(() => hoveredIconsLayerDef(), [])
    const hoveredCirclesLayer = useMemo<CircleLayer>(() => hoveredCirclesLayerDef(), [])

    const markerSourceData = useMemo(() => markerFeatureCollection(markerState, localMarkerState), [markerState, localMarkerState])
    const hoveredSourceData = useMemo(() => hoveredState ? hoveredFeatureCollection(hoveredState) : emptyFeatureCollection(), [hoveredState])
    const lineSourceData = useMemo(() => hoveredState ? lineFeatureCollection(hoveredState, markerState, localMarkerState) : emptyFeatureCollection(), [hoveredState, markerState, localMarkerState])
    const tooltipState = useMemo(() => hoveredState ? createTooltipState(hoveredState, markerState, localMarkerState) : null, [hoveredState, markerState, localMarkerState])

    useEffect(() => {
        addFilterToSource()
    }, [currentFilter])

    const addFilterToSource = () => {
        if (mapRef.current) {
            const sirenmapSource = (mapRef.current?.getSource('sirenmap') as VectorTileSource)
            if (sirenmapSource) {
                const baseUrl = sirenmapSource?.url.split("?")[0]
                sirenmapSource.setUrl(baseUrl + mapFilter2JsonQuery(currentFilter))
            }
        }
    }

    const mapOnLoad = useCallback(() => {
        addFilterToSource()
    }, [])

    const mapOnMove = useCallback((e: ViewStateChangeEvent) => {
        setViewState(e.viewState)
        if (!markerState.locked) {
            setLocalMarkerState({longitude: e.viewState.longitude, latitude: e.viewState.latitude})
        }
    }, [markerState, hoveredState])

    const mapOnMoveEnd = useCallback((e: ViewStateChangeEvent) => {
        if (!markerState.locked) {
            setMarkerState(createUnlockedMarkerState(e.viewState.longitude, e.viewState.latitude))
            setLocalMarkerState(null)
        }
    }, [markerState])

    const mapOnMouseDown = useCallback((e: MapLayerMouseEvent) => {
        if (e.features && e.features[0] && e.features[0].source == 'marker' && markerState.locked && e.originalEvent.button == 0) {
            e.preventDefault();
            setLocalMarkerState({grabbed: true, longitude: e.lngLat.lng, latitude: e.lngLat.lat})
            setPopupState(null)
            e.target.once('mouseup', (e) => {
                setMarkerState(createLockedMarkerState(e.lngLat.lng, e.lngLat.lat))
                setLocalMarkerState(null)
            });
        }
    }, [markerState])

    const mapOnMouseMove = useCallback((e: MapLayerMouseEvent) => {
        if (e.target.isMoving()) {
            hoverUnhover()
        }

        if (localMarkerState?.grabbed === true) {
            setLocalMarkerState({grabbed: true, longitude: e.lngLat.lng, latitude: e.lngLat.lat})
            return
        }

        if (e.features && e.features[0]) {
            const feature = e.features[0]
            if (feature.source == 'sirenmap') {
                setCursor('pointer')
                hoverUnhover(feature)
            }
            if (feature.source == 'marker' && markerState.locked) {
                setCursor('move')
            }
        } else {
            setCursor('')
        }
    }, [markerState, hoveredState, cursor, localMarkerState])

    const mapOnMouseLeave = useCallback(() => {
        hoverUnhover()
    }, [hoveredState])

    const mapOnContextMenu = useCallback((e: MapLayerMouseEvent) => {
        if (e.features && e.features[0]) {
            const feature = e.features[0]
            if (feature.source == 'marker') {
                setPopupState(createMarkerPopupState(feature))
            }
            if (feature.source == 'sirenmap') {
                setPopupState(createSirenPopupState(feature))
            }
        } else {
            setPopupState(createMapPopupState(e.lngLat))
        }
    }, [popupState])

    const hoverUnhover = (feature?: MapGeoJSONFeature | undefined) => {
        if (feature) {
            if (hoveredState?.id != feature.id) {
                if (hoveredState) {
                    mapRef.current!.setFeatureState(featureStateId(hoveredState.id), {hovered: false})
                }
                mapRef.current!.setFeatureState(featureStateId(feature.id), {hovered: true})
                setHoveredState(createHoveredState(feature))
                setPopupState(null)
            }
        } else {
            if (hoveredState) {
                mapRef.current!.setFeatureState(featureStateId(hoveredState.id), {hovered: false})
                setHoveredState(null)
                setPopupState(null)
            }
        }
    }

    const popupOnAction = (action: PopupAction) => {
        switch (action) {
            case PopupAction.LOCK_MARKER: {
                setMarkerState(createLockedMarkerState(popupState!.longitude, popupState!.latitude))
                break
            }
            case PopupAction.UNLOCK_MARKER: {
                setMarkerState(createUnlockedMarkerState(viewState.longitude, viewState.latitude))
                break
            }
            case PopupAction.MOVE_TO_CENTER: {
                mapRef.current!.flyTo({center: [popupState!.longitude, popupState!.latitude]})
                break
            }
            case PopupAction.ADD_SIREN_SITE: {
                // TODO
                break
            }
            case PopupAction.EDIT_SIREN_SITE: {
                // TODO
                break
            }
        }
        setPopupState(null)
    }

    return (
        <Map
            id={'map'}
            ref={mapRef}
            {...viewState}
            style={{position: 'absolute', width: '100vw', height: '100vh'}}
            mapStyle={'https://api.worldsirenmap.net/map/styles/sirenmap.json'}
            cursor={cursor}
            interactiveLayerIds={['Marker Layer', 'Marker Locked Layer', 'Siren Icons']}
            attributionControl={false}
            onMove={mapOnMove}
            onMoveEnd={mapOnMoveEnd}
            onContextMenu={mapOnContextMenu}
            onMouseDown={mapOnMouseDown}
            onMouseMove={mapOnMouseMove}
            onMouseLeave={mapOnMouseLeave}
            onLoad={mapOnLoad}
        >
            <NavigationControl position='top-right'/>
            <Source id={'line'} type={'geojson'} data={lineSourceData}>
                <Layer {...lineLayer} />
            </Source>
            <Source id={'marker'} type={'geojson'} data={markerSourceData}>
                <Layer {...markerLayer} />
                <Layer {...markerLockedLayer} />
            </Source>
            <Source id={'hovered'} type={'geojson'} data={hoveredSourceData}>
                <Layer {...hoveredIconsLayer} />
                <Layer {...hoveredCirclesLayer} />
            </Source>
            {popupState && (
                <Popup
                    anchor={'left'}
                    longitude={popupState.longitude!}
                    latitude={popupState.latitude!}
                    closeOnMove={true}
                    closeButton={false}
                    onClose={() => setPopupState(null)}
                >
                    <Stack gap={5}>
                        {(popupState.context == PopupContext.MAP || popupState.context == PopupContext.MARKER) && (
                            <>
                                <Button
                                    disabled={viewState.zoom < 17}
                                    variant="filled"
                                    size={'sm'}
                                    color={'wsm'}
                                    fw={'normal'}
                                    onClick={() => popupOnAction(PopupAction.ADD_SIREN_SITE)}
                                >Add siren site</Button>
                                <Button
                                    variant="filled"
                                    size={'compact-sm'}
                                    color={'#4E7B9D'}
                                    fw={'normal'}
                                    onClick={() => popupOnAction(PopupAction.LOCK_MARKER)}
                                >Lock marker here</Button>
                            </>
                        )}
                        {(popupState.context == PopupContext.SIREN_SITE) && (
                            <>
                                <Button
                                    variant="filled"
                                    size={'sm'}
                                    color={'wsm'}
                                    fw={'normal'}
                                    onClick={() => popupOnAction(PopupAction.EDIT_SIREN_SITE)}
                                >Edit siren site</Button>
                                <Button
                                    variant="filled"
                                    size={'compact-sm'}
                                    color={'#4E7B9D'}
                                    fw={'normal'}
                                    onClick={() => popupOnAction(PopupAction.LOCK_MARKER)}
                                >Lock marker here</Button>
                            </>
                        )}
                        {popupState.context == PopupContext.LOCKED_MARKER && (
                            <Button
                                variant="filled"
                                size={'compact-sm'}
                                color={'#4E7B9D'}
                                fw={'normal'}
                                onClick={() => popupOnAction(PopupAction.UNLOCK_MARKER)}
                            >Unlock marker</Button>
                        )}
                        {popupState.context != PopupContext.MARKER && (
                            <Button
                                variant="filled"
                                size={'compact-sm'}
                                color={'gray'}
                                fw={'normal'}
                                onClick={() => popupOnAction(PopupAction.MOVE_TO_CENTER)}
                            >Center map here</Button>
                        )}
                    </Stack>
                </Popup>
            )}
            {tooltipState && (
                <Popup
                    closeButton={false}
                    closeOnMove={false}
                    closeOnClick={false}
                    anchor={'top'}
                    longitude={tooltipState.longitude}
                    latitude={tooltipState.latitude}>
                    <Text size={'xs'} lh={1} c={'black'}>Distance: <b>{tooltipState.text}</b></Text>
                </Popup>
            )}
        </Map>
    );
}