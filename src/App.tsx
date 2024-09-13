import {createTheme, MantineProvider} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css'

import './config/i18n.ts'
import './config/axios.ts'

import MapView from "./components/map/MapView.tsx";
import TypesModal from "./components/modals/library/LibraryModal.tsx";
import LoginModal from "./components/modals/login/LoginModal.tsx";
import {Notifications} from "@mantine/notifications";
import {Ui} from "./components/ui/Ui.tsx";
import {MapProvider} from "react-map-gl/maplibre";
import MessagesModal from "./components/modals/messages/MessagesModal.tsx";
import InfoModal from "./components/modals/info/InfoModal.tsx";
import FilterModal from "./components/modals/filter/FilterModal.tsx";

import {useEffect} from "react";
import {useMapFilter} from "./hooks/mapFilter.ts";
import SiteModal from "./components/modals/site/SiteModal.tsx";
import {useModalAtom} from "./config/atoms.ts";


const theme = createTheme({
    colors: {
        wsm: [
            '#fff5e2',
            '#feebce',
            '#fad5a0',
            '#f6bd6d',
            '#f3a943',
            '#f29d27',
            '#f19717',
            '#d68309',
            '#bf7301',
            '#a66300'
        ]
    },
    primaryColor: 'wsm',
    primaryShade: 6,
    focusRing: 'never',
});

function App() {
    const {loadFilterData} = useMapFilter()
    const {isModalOpen} = useModalAtom()

    useEffect(() => {
        loadFilterData()
    }, [])

    return (
        <MantineProvider
            theme={theme}
            forceColorScheme={'dark'}
        >
            <Notifications position={"top-center"}/>
            <MapProvider>
                <MapView/>
                <Ui/>
                <TypesModal/>
                <LoginModal/>
                <MessagesModal/>
                <InfoModal/>
                {isModalOpen('site') && <SiteModal/>}
                <FilterModal/>
            </MapProvider>
        </MantineProvider>
    )
}

export default App
