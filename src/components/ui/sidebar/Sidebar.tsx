import {ActionIcon, CloseButton, Divider, Drawer, Group, Loader, Stack, Tooltip, useMantineTheme} from "@mantine/core";
import {IconBooks, IconFilter, IconInfoCircle, IconListDetails, IconMessage} from "@tabler/icons-react";
import {useLoading, useModalAtom} from "../../../config/atoms.ts";
import CurrentUser from "./CurrentUser.tsx";
import SiteList from "./SiteList.tsx";


export default () => {
    const theme = useMantineTheme()
    const {openModal, closeModal, isModalOpen} = useModalAtom()
    const [loading] = useLoading()

    return <>

        <Drawer
            size={'sm'}
            closeOnEscape={false} withCloseButton={false} offset={10} radius={'md'} lockScroll={false}
            withOverlay={false} opened={isModalOpen("sidebar")} onClose={closeModal} styles={{body: {height: '100%'}}}>
            <Stack justify={"stretch"} h={'100%'}>
                <Group justify={'space-between'} align={'flex-start'}>
                    <CurrentUser/>
                    <CloseButton onClick={closeModal}/>
                </Group>
                <SiteList/>

                <Divider/>
                <Group justify={"space-between"}>
                    <Group gap={0}>
                        <Tooltip label={'Filter sites'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("types")}>
                                <IconFilter size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Library'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("types")}>
                                <IconBooks size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Coming soon'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("types")}>
                                <IconMessage size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'Info'} openDelay={500}>
                            <ActionIcon variant={"subtle"} size={52} onClick={() => openModal("types")}>
                                <IconInfoCircle size={32} stroke={1.6} color={theme.colors.wsm[6]}/>
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    {loading && <Loader size={24}/> }
                </Group>


            </Stack>
        </Drawer>

    </>
}