import {IconBrandGithub, IconInfoCircle, IconMail, IconMoodWink2, IconWorldPin} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {Center, Group, Tabs, Text} from "@mantine/core";
import {useTranslation} from "../../hooks/translation.ts";
import ContributePanel from "./contribute/ContributePanel.tsx";
import InfoPanel from "./imprint/ImprintPanel.tsx";

export default () => {
    const {t} = useTranslation()
    return (
        <Modal
            title={t("$ui.modals.info.title")}
            size={800}
            icon={IconWorldPin}
        >
            <Tabs defaultValue={'info'} variant={'outline'} styles={{root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}}>
                <Tabs.List>
                    <Tabs.Tab value="info" leftSection={<IconInfoCircle/>}>
                        {t("$ui.modals.info.tabs.info")}
                    </Tabs.Tab>
                    <Tabs.Tab value="feedback" leftSection={<IconMail/>}>
                        {t("$ui.modals.info.tabs.feedback")}
                    </Tabs.Tab>
                    <Tabs.Tab value="contribute" leftSection={<IconBrandGithub/>}>
                        {t("$ui.modals.info.tabs.contribute")}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="info" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <InfoPanel/>
                </Tabs.Panel>
                <Tabs.Panel value="feedback" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <Center h={'100%'}>
                        <Group gap={10}>
                            <IconMoodWink2/>
                            <Text>Coming soon!</Text>
                        </Group>
                    </Center>
                </Tabs.Panel>
                <Tabs.Panel value="contribute" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <ContributePanel/>
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}