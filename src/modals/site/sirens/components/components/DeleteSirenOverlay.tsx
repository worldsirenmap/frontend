import {Button, Center, Group, Overlay, Paper, Stack, Text, useMantineTheme} from "@mantine/core";
import {IconTrash, IconX} from "@tabler/icons-react";
import {useTranslation} from "../../../../../hooks/translation.ts";

type DeleteSirenOverlayProps = {
    onDelete: () => void
    onCancel: () => void
}

export default ({onDelete, onCancel}: DeleteSirenOverlayProps) => {
    const theme = useMantineTheme()
    const {t} = useTranslation()
    return (
        <Overlay color={theme.colors.dark[8]} radius={'lg'} backgroundOpacity={0.75} blur={2}>
            <Center h={'100%'}>
                <Paper bg={theme.colors.dark[8]} radius={'md'} p={10}>
                    <Stack align={'center'}>
                        <Text style={{textAlign: 'center'}}>{t("$ui.modals.site.sirens.delete.confirm")}</Text>
                        <Group>
                            <Button color={'dark'} leftSection={<IconX size={16}/>} onClick={() => onCancel()}>{t("$ui.modals.site.sirens.delete.actions.cancel")}</Button>
                            <Button color={'red.9'} leftSection={<IconTrash size={16}/>} onClick={() => onDelete()}>{t("$ui.modals.site.sirens.delete.actions.ok")}</Button>
                        </Group>
                    </Stack>
                </Paper>
            </Center>
        </Overlay>
    )
}