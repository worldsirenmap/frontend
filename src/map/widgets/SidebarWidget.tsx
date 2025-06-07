import {ActionIcon, CloseButton, Divider, Drawer, Group, Stack, Tabs, Tooltip, useMantineTheme} from "@mantine/core";
import {IconBooks, IconChartHistogram, IconFilterFilled, IconFilterHeart, IconFilterPin, IconHelpSquareRounded, IconHistory, IconMapPin, IconWorldPin} from "@tabler/icons-react";
import {useSidebarAtom} from "../../config/atoms.ts";
import CurrentUser from "./sidebar/CurrentUser.tsx";
import SiteList from "./sidebar/SiteList.tsx";
import Filter from "./sidebar/Filter.tsx";
import {useMapFilter} from "../../hooks/mapFilter.ts";
import {useTranslation} from "../../hooks/translation.ts";
import {useNavigation} from "../../hooks/navigation.ts";


export default () => {
    const theme = useMantineTheme()
    const {isSidebarOpen, closeSidebar} = useSidebarAtom()
    const {isMapFilterActive} = useMapFilter()
    const {t} = useTranslation()
    const navigate = useNavigation()

    return <>

        <Drawer
            size={'sm'}
            closeOnEscape={false} withCloseButton={false} offset={10} radius={'md'} lockScroll={false}
            withOverlay={false} opened={isSidebarOpen} onClose={() => closeSidebar()}
            styles={{body: {height: '100%'}}}>
            <Stack justify={"stretch"} h={'100%'}>
                <Group justify={'space-between'} align={'flex-start'}>
                    <CurrentUser/>
                    <CloseButton onClick={() => closeSidebar()}/>
                </Group>
                <Tabs
                    defaultValue={'list'}
                    activateTabWithKeyboard={false}
                    styles={{
                        root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'},
                        panel: {flex: '1 1 auto', display: 'flex', height: '1px'},
                    }}
                >
                    <Tabs.List grow>
                        <Tabs.Tab value="list" leftSection={<IconMapPin/>} w={'50%'}>
                            {t("$ui.sidebar.tabs.nearby")}
                        </Tabs.Tab>
                        <Tabs.Tab value="filter" leftSection={
                            isMapFilterActive
                                ? <IconFilterFilled color={theme.colors.red[6]}/>
                                : <IconFilterPin/>
                        } w={'50%'}>
                            {t("$ui.sidebar.tabs.filter")}
                        </Tabs.Tab>

                    </Tabs.List>
                    <Tabs.Panel value={'list'}>
                        <SiteList/>
                    </Tabs.Panel>
                    <Tabs.Panel value={'filter'}>
                        <Filter/>
                    </Tabs.Panel>
                </Tabs>

                <Divider/>
                <Group gap={0} justify={'center'}>
                    <Tooltip label={t("$ui.sidebar.apps.filter")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("filter")}>
                            <IconFilterHeart size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={t("$ui.sidebar.apps.library")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("library")}>
                            <IconBooks size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={t("$ui.sidebar.apps.activities")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("activities")}>
                            <IconHistory size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={t("$ui.sidebar.apps.statistics")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("statistics")}>
                            <IconChartHistogram size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={t("$ui.sidebar.apps.infos")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("info")}>
                            <IconWorldPin size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={t("$ui.sidebar.apps.help")} openDelay={500}>
                        <ActionIcon variant={"subtle"} size={52} onClick={() => navigate("help")}>
                            <IconHelpSquareRounded size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Stack>
        </Drawer>

    </>
}