import {useEffect, useRef} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
    console.log("Render")
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<maplibregl.Map>(null)

    useEffect(() => {
        if (mapRef.current) return;

        console.log("Effect")
        const map = new maplibregl.Map({
            container: mapContainer.current!,
            style: 'https://api.worldsirenmap.net/map/styles/sirenmap.json',
            center: [8.133522590488898, 50.25649427798203],
            zoom: 10,
            attributionControl: false,
            hash: true,
            locale: 'de',
            renderWorldCopies: false,
        });

        map.on('load', async () => {
            map.addControl(new maplibregl.NavigationControl());
            map.addControl(
                new maplibregl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                })
            );

        })

        mapRef.current = map
    }, []);


    return (
        <>
            <div ref={mapContainer} style={{position: 'absolute', width: '100%', height: '100%'}}/>
        </>
    );
}