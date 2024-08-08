import classes from './Sidebar.module.css'
import {ActionIcon, Anchor, Avatar, Box, Button, CloseButton, Drawer, Group, Stack, Tabs, Text} from "@mantine/core";
import {IconFilter, IconFilterStar, IconListDetails, IconMenu2} from "@tabler/icons-react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTypesModalAtom} from "../../config/atoms.ts";


export default () => {
    const [opened, setOpened] = useState(true)
    const { open: openTypesModal } = useTypesModalAtom()
    const {t, i18n} = useTranslation('header')

    return <>
        <Box className={classes.box}>
            <ActionIcon radius={'sm'} size={'xl'} onClick={() => setOpened(true)}>
                <IconMenu2 size={32}/>
                {/*<IconFilterFilled size={32}/>*/}
            </ActionIcon>
        </Box>
        <Drawer closeOnEscape={false} withCloseButton={false} offset={10} radius={'md'} lockScroll={false}
                withOverlay={false} opened={opened} onClose={() => setOpened(false)}>
            <Stack gap={'xl'}>
                <Group justify={'space-between'} align={'flex-start'}>
                    <Group>
                        <Avatar color={'wsm'} size={52}>M</Avatar>
                        <Stack gap={0} align={'flex-start'}>
                            <Text fw={'bold'} lh={'xs'}>Mithotyn</Text>
                            <Group>
                                <Anchor size={'sm'} component={'button'}>Profile</Anchor>
                                <Anchor size={'sm'} component={'button'}>Logout</Anchor>
                            </Group>
                        </Stack>
                    </Group>
                    <CloseButton onClick={() => setOpened(false)}/>
                </Group>
                <Group grow>
                    <Button onClick={() => {setOpened(false); openTypesModal();}}>Siren types</Button>
                    <Button onClick={() => {setOpened(false); openTypesModal();}}>Manufacturers</Button>
                </Group>
                <Tabs defaultValue="gallery">
                    <Tabs.List grow>
                        <Tabs.Tab value="gallery" leftSection={<IconFilter/>}>
                            Filter
                        </Tabs.Tab>
                        <Tabs.Tab value="messagess" leftSection={<IconFilterStar/>}>
                            Saved Filters
                        </Tabs.Tab>
                        <Tabs.Tab value="messages" leftSection={<IconListDetails/>}>
                            Site List
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>

            </Stack>
        </Drawer>

    </>
}