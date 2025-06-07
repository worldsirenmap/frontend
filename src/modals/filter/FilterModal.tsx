import {IconFilterHeart, IconMoodWink2} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import {Center, Group, Text} from "@mantine/core";
import React from "react";

export default () => {
    const {t} = useTranslation()
    return (
        <Modal
            title={t("$ui.modals.filter.title")}
            size={"50vw"}
            icon={IconFilterHeart}
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