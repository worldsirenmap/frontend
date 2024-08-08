import {createTheme, MantineProvider} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css'

import './config/i18n.ts'
import Map from "./components/map/Map.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import TypesModal from "./components/modals/types/TypesModal.tsx";

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
            <Map/>
            <Sidebar/>
            <TypesModal/>
        </MantineProvider>
    )
}

export default App
