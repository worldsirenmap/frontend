import {Anchor, Box, ScrollArea, Stack, Text, Title} from "@mantine/core";
import {useTranslation} from "../../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <Stack mx={20} my={10}>
                <Text>{t("$ui.modals.info.contribute.head")}</Text>
                <Box>
                    <Title order={5}>{t("$ui.modals.info.contribute.translation.title")}</Title>
                    <Text>{t("$ui.modals.info.contribute.translation.content")}</Text>
                    <Anchor href={"https://github.com/worldsirenmap/translation"}>GitHub</Anchor>
                </Box>
                <Box>
                    <Title order={5}>{t("$ui.modals.info.contribute.icons.title")}</Title>
                    <Text>{t("$ui.modals.info.contribute.icons.content")}</Text>
                    <Anchor href={"https://github.com/worldsirenmap/siren-icons"}>GitHub</Anchor>
                </Box>
                <Box>
                    <Title order={5}>{t("$ui.modals.info.contribute.frontend.title")}</Title>
                    <Text>{t("$ui.modals.info.contribute.frontend.content")}</Text>
                    <Anchor href={"https://github.com/worldsirenmap/frontend"}>GitHub</Anchor>
                </Box>
                <Box>
                    <Title order={5}>{t("$ui.modals.info.contribute.bugfeatures.title")}</Title>
                    <Text>{t("$ui.modals.info.contribute.bugfeatures.content")}</Text>
                    <Anchor href={"mailto:support@worldsirenmap.net"}>support@worldsirenmap.net</Anchor>
                </Box>
            </Stack>
        </ScrollArea>
    )
}