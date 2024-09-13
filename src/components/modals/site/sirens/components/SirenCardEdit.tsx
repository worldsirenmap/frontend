import {ActionIcon, Box, Button, Center, ComboboxItem, Divider, Group, Overlay, Paper, Select, Stack, Text, useMantineTheme} from "@mantine/core";
import {SirenDetails, SirenOption, SirenOptions} from "../../../../../config/api.ts";
import {IconCheck, IconTrash, IconX} from "@tabler/icons-react";
import {useState} from "react";
import {useTimeout} from "@mantine/hooks";
import StatusBadge from "../../../../ui/SirenStatusBadge.tsx";
import useAxios from "axios-hooks";

type SirenCardEditProps = {
    siren: SirenDetails
    onClose: () => void
}

type SirenOptionItem = {
    sirenoption: SirenOption
}

export default ({siren, onClose}: SirenCardEditProps) => {
    const theme = useMantineTheme()
    const [{data: sirenOptions, loading: sirenOptionsLoading}] = useAxios<SirenOptions>("/library/sirenoptions")

    const [sirenOption, setSirenOption] = useState<string>(siren.manufacturerId + ":" + siren.modelId)
    const [newSiren, setNewSiren] = useState<SirenDetails>(siren)
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const {start, clear} = useTimeout(() => setConfirmDelete(false), 2000)

    const showConfirmDelete = () => {
        setConfirmDelete(true)
        start()
    }

    const deleteConfirmed = () => {
        setConfirmDelete(false)
        clear()
        onClose()
    }

    const deleteAborted = () => {
        setConfirmDelete(false)
        clear()
    }

    const changeSirenOption = (option: ComboboxItem) => {
        setSirenOption(option.value)

        const selectedOption = (option as unknown as SirenOptionItem).sirenoption;
        setNewSiren(old => ({
            ...old,
            icon: selectedOption.icon,
            manufacturerId: selectedOption.manufacturerId,
            manufacturer: selectedOption.manufacturer,
            modelId: selectedOption.modelId,
            model: selectedOption.model,
        }))
    }

    return (
        <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} style={{display: 'flex', flexDirection: 'column', gap: 20, position: 'relative'}}>
            <Group gap={'lg'}>
                <img alt="Icon" height={80} src={'https://api.worldsirenmap.net/assets/siren-icons/' + newSiren.icon + '.svg'}/>
                <Stack gap={5}>
                    <Text lh={1} fw={'bold'}>{newSiren.model}</Text>
                    <Text pb={10} lh={1} size={'sm'}>{newSiren.manufacturer}</Text>
                    <StatusBadge status={newSiren.condition}/>
                </Stack>
            </Group>
            <Divider/>
            <Select
                value={sirenOption}
                onChange={(_, option) => changeSirenOption(option)}
                disabled={sirenOptionsLoading}
                searchable
                nothingFoundMessage={"Nothing found"}
                data={sirenOptions?.map(sirenoption => ({
                    value: sirenoption.manufacturerId + ":" + sirenoption.modelId,
                    label: sirenoption.manufacturer + " " + sirenoption.model,
                    sirenoption
                }))}
                renderOption={({ option }) => (
                    <Group gap={'sm'}>
                        <img alt="Icon" height={40} src={'https://api.worldsirenmap.net/assets/siren-icons/' + option.sirenoption.icon + '.svg'}/>
                        <Stack gap={5}>
                            <Text lh={1} size={'sm'} fw={'bold'}>{option.sirenoption.model}</Text>
                            <Text lh={1} size={'xs'}>{option.sirenoption.manufacturer}</Text>
                        </Stack>
                    </Group>
                )}
            />

            <Box style={{flex: '1 1 auto'}}/>
            <Group justify={'space-between'}>
                <ActionIcon variant={'outline'} size={24} color={'red.9'} onClick={showConfirmDelete}><IconTrash size={16}/></ActionIcon>
                <Group gap={10}>
                    <ActionIcon size={24} onClick={onClose} color={'red.9'}><IconX size={16}/></ActionIcon>
                    <ActionIcon size={24} onClick={onClose} color={'green.9'}><IconCheck size={16}/></ActionIcon>
                </Group>
            </Group>
            {confirmDelete && (
                <Overlay color={theme.colors.dark[8]} radius={'lg'} backgroundOpacity={0.75} blur={2}>
                    <Center h={'100%'}>
                        <Stack align={'center'}>
                            <Text>Are you sure to really delete this siren?</Text>
                            <Group>
                                <Button color={'dark'} leftSection={<IconX size={16}/>} onClick={deleteAborted}>Abort</Button>
                                <Button color={'red.9'} leftSection={<IconTrash size={16}/>} onClick={deleteConfirmed}>Delete</Button>
                            </Group>
                        </Stack>
                    </Center>
                </Overlay>
            )}
        </Paper>
    )
}