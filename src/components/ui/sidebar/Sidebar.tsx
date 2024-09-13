import {
    ActionIcon,
    CloseButton,
    Divider,
    Drawer,
    Group,
    Loader,
    Stack,
    Tabs,
    Tooltip,
    useMantineTheme
} from "@mantine/core";
import {IconBooks, IconFilter, IconFilterFilled, IconMapPin, IconMessage, IconWorldPin} from "@tabler/icons-react";
import {useLoading, useModalAtom, useSidebarAtom} from "../../../config/atoms.ts";
import CurrentUser from "./CurrentUser.tsx";
import SiteList from "./SiteList.tsx";
import Filter from "./Filter.tsx";
import {useMapFilter} from "../../../hooks/mapFilter.ts";


export default () => {
    const theme = useMantineTheme()
    const {openModal} = useModalAtom()
    const {isSidebarOpen, closeSidebar} = useSidebarAtom()
    const [loading] = useLoading()
    const {isMapFilterActive} = useMapFilter()

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
                        <Tabs.Tab value="list" leftSection={<IconMapPin/>}>
                            Nearby sirens
                        </Tabs.Tab>
                        <Tabs.Tab value="filter" leftSection={
                            isMapFilterActive
                                ? <IconFilterFilled color={theme.colors.red[6]}/>
                                : <IconFilter/>
                        }>
                            Filter
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
                <Group justify={"space-between"}>
                    <Group gap={0}>
                        <Tooltip label={'Filter sites'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("filter")}>
                                <IconFilter size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Library'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("types")}>
                                <IconBooks size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Coming soon'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("messages")}>
                                <IconMessage size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Info'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("info")}>
                                <IconWorldPin size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    {loading && <Loader size={24}/>}
                </Group>


            </Stack>
        </Drawer>

    </>
}