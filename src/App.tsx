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
import AddSiteModal from "./components/modals/site/AddSiteModal.tsx";
import {MapProvider} from "react-map-gl/maplibre";

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
                <AddSiteModal/>
            </MapProvider>
        </MantineProvider>
    )
}

export default App
