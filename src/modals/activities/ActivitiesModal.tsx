import {IconHistory, IconMoodWink2} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import {Center, Group, Text} from "@mantine/core";
import React from "react";

export default () => {
    const {t} = useTranslation()
    return (
        <Modal
            title={t("$ui.modals.activities.title")}
            size={"50vw"}
            icon={IconHistory}
        >
            <Center h={'50vh'}>
                <Group gap={10}>
                    <IconMoodWink2/>
                    <Text>Coming soon!</Text>
                </Group>
            </Center>
        </Modal>
    )
}