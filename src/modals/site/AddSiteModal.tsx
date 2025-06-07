import {IconMapPin, IconMoodWink2} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {Center, Group, Text} from "@mantine/core";
import {useTranslation} from "../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    return (
        <Modal
            title={t("$ui.modals.addsite.title")}
            size={800}
            icon={IconMapPin}
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