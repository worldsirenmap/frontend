import {createTheme, MantineProvider} from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './config/i18n.ts'
import './config/axios.ts'

import MapView from "./map/MapView.tsx";
import LibraryModal from "./modals/library/LibraryModal.tsx";
import LoginModal from "./modals/user/LoginModal.tsx";
import {Notifications} from "@mantine/notifications";
import {MapUi} from "./map/MapUi.tsx";
import {MapProvider} from "react-map-gl/maplibre";
import ActivitiesModal from "./modals/activities/ActivitiesModal.tsx";
import InfoModal from "./modals/info/InfoModal.tsx";
import FilterModal from "./modals/filter/FilterModal.tsx";

import {useEffect} from "react";
import {useMapFilter} from "./hooks/mapFilter.ts";
import SiteModal from "./modals/site/SiteModal.tsx";
import {useRouter} from "./hooks/navigation.ts";
import HelpModal from "./modals/help/HelpModal.tsx";
import ProfileModal from "./modals/user/ProfileModal.tsx";
import RegisterModal from "./modals/user/RegisterModal.tsx";
import PasswordResetModal from "./modals/user/PasswordResetModal.tsx";
import ActivateModal from "./modals/user/ActivateModal.tsx";
import StatisticsModal from "./modals/statistics/StatisticsModal.tsx";
import AddSiteModal from "./modals/site/AddSiteModal.tsx";

import '@mantine/charts/styles.css';

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
    const pathMatches = useRouter()

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
                <MapUi/>
                {pathMatches("filter") && <FilterModal/>}
                {pathMatches("library") && <LibraryModal/>}
                {pathMatches("activities") && <ActivitiesModal/>}
                {pathMatches("info") && <InfoModal/>}
                {pathMatches("help") && <HelpModal/>}

                {pathMatches("login") && <LoginModal/>}
                {pathMatches("register") && <RegisterModal/>}
                {pathMatches("passwordreset") && <PasswordResetModal/>}
                {pathMatches("activate", /^[0-9a-fA-F-]{36}$/) && <ActivateModal/>}
                {pathMatches("profile") && <ProfileModal/>}
                {pathMatches("settings") && <ProfileModal/>}
                {pathMatches("site", /^\d+$/) && <SiteModal/>}
                {pathMatches("statistics", false) && <StatisticsModal/>}
                {pathMatches("addsite") && <AddSiteModal/>}
            </MapProvider>
        </MantineProvider>
    )
}

export default App
