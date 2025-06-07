import {IconHelpSquareRounded, IconMailQuestion, IconMapPinQuestion, IconProps} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import {Accordion, Anchor, Divider, Group, Paper, ScrollArea, Stack, Text, Title, useMantineTheme} from "@mantine/core";
import React, {ComponentType} from "react";
import {useNavigation} from "../../hooks/navigation.ts";

type FaqEntryProps = {
    title: string
    content: string
    linkUrl?: string
    linkText?: string
    icon: ComponentType<IconProps>
}
const _FaqEntry = (props: FaqEntryProps) => {
    const theme = useMantineTheme()
    const navigate = useNavigation()

    return (
        <Paper p={20}>
            <Group gap={10} align={'flex-start'}>
                <props.icon size={24} color={theme.colors.wsm[6]}></props.icon>
                <Stack gap={5}>
                    <Title order={5}>{props.title}</Title>
                    <Text size={'sm'}>{props.content}</Text>
                    {props.linkUrl && props.linkText && (
                        <Anchor size={'sm'} onClick={() => navigate(props.linkUrl!)}>{props.linkText}</Anchor>
                    )}
                </Stack>
            </Group>
        </Paper>
    )
}

const FaqEntry = (props: FaqEntryProps) => {
    const theme = useMantineTheme()
    const navigate = useNavigation()

    return (
        <Accordion.Item key={props.title} value={props.title}>
            <Accordion.Control icon={<props.icon size={24} color={theme.colors.wsm[6]}></props.icon>}>
                {props.title}
            </Accordion.Control>
            <Accordion.Panel>
                <Text size={'sm'}>{props.content}</Text>
                {props.linkUrl && props.linkText && (
                    <Anchor size={'sm'} onClick={() => navigate(props.linkUrl!)}>{props.linkText}</Anchor>
                )}            </Accordion.Panel>
        </Accordion.Item>
    )
}

export default () => {
    const {t} = useTranslation()
    return (
        <Modal
            title={t("$ui.modals.help.title")}
            size={"30vw"}
            icon={IconHelpSquareRounded}
        >
            <Text px={15} pb={25}>{t("$ui.modals.help.head")} <Anchor href={"mailto:support@worldsirenmap.net"}>support@worldsirenmap.net</Anchor></Text>
            <Divider/>
            <ScrollArea flex={'1 1 auto'}>
                <Accordion>
                    <FaqEntry
                        title={t("$ui.modals.help.entry01.title")}
                        content={t("$ui.modals.help.entry01.content")}
                        linkUrl={"register"}
                        linkText={t("$ui.modals.help.entry01.linkText")}
                        icon={IconMapPinQuestion}
                    />
                    <FaqEntry
                        title={t("$ui.modals.help.entry02.title")}
                        content={t("$ui.modals.help.entry02.content")}
                        linkUrl={"register"}
                        linkText={t("$ui.modals.help.entry02.linkText")}
                        icon={IconMapPinQuestion}
                    />
                    <FaqEntry
                        title={t("$ui.modals.help.entry03.title")}
                        content={t("$ui.modals.help.entry03.content")}
                        icon={IconMapPinQuestion}
                    />
                </Accordion>
            </ScrollArea>
        </Modal>
    )
}