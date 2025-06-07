import {IconBox, IconBuildingFactory2, IconChartHistogram, IconMapPin, IconUserPin} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import {Tabs} from "@mantine/core";
import {useNavigation, useUrlParams} from "../../hooks/navigation.ts";
import UsersPanel from "./users/UsersPanel.tsx";
import SirensPanel from "./sirens/SirensPanel.tsx";
import ModelsPanel from "./models/ModelsPanel.tsx";
import ManufacturersPanel from "./manufacturers/ManufacturersPanel.tsx";

export default () => {
    const {t} = useTranslation()
    const urlParams = useUrlParams()
    const navigate = useNavigation()

    const activeTab = urlParams[0] ?? 'users'

    return (
        <Modal
            title={t("$ui.modals.statistics.title")}
            size={"60vw"}
            icon={IconChartHistogram}
        >
            <Tabs value={activeTab} onChange={(value) => navigate('statistics', value!)} variant={'outline'} styles={{root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}}>
                <Tabs.List>
                    <Tabs.Tab
                        value="sirens"
                        leftSection={<IconMapPin/>}
                    >
                        {t("$ui.modals.statistics.tabs.sirens")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="models"
                        leftSection={<IconBox/>}
                    >
                        {t("$ui.modals.statistics.tabs.models")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="manufacturers"
                        leftSection={<IconBuildingFactory2/>}
                    >
                        {t("$ui.modals.statistics.tabs.manufacturers")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="users"
                        leftSection={<IconUserPin/>}
                    >
                        {t("$ui.modals.statistics.tabs.users")}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="sirens" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <SirensPanel/>
                </Tabs.Panel>
                <Tabs.Panel value="models" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <ModelsPanel/>
                </Tabs.Panel>
                <Tabs.Panel value="manufacturers" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <ManufacturersPanel/>
                </Tabs.Panel>
                <Tabs.Panel value="users" style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <UsersPanel/>
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}