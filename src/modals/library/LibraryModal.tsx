import {Badge, Loader, Tabs} from "@mantine/core";

import {IconBooks, IconBox, IconBuildingFactory2, IconCategory, IconCircleNumber1, IconCircleNumber2, IconCircleNumber3, IconCircleNumber4, IconSettingsQuestion} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import ModelPanel from "./model/ModelPanel.tsx";
import ManufacturerPanel from "./manufacturer/ManufacturerPanel.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import useAxios from "axios-hooks";
import {useMapFilter} from "../../hooks/mapFilter.ts";

export default () => {
    const {t} = useTranslation()
    const {filterData} = useMapFilter()

    return (
        <Modal
            title={t("$ui.modals.library.title")}
            size={"60vw"}
            icon={IconBooks}
        >
            <Tabs defaultValue={'models'} variant="outline" styles={{root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}}>
                <Tabs.List>
                    <Tabs.Tab
                        value="models"
                        leftSection={<IconBox/>}
                    >
                        {t("$ui.modals.library.tabs.models")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="manufacturer"
                        leftSection={<IconBuildingFactory2/>}
                    >
                        {t("$ui.modals.library.tabs.manufacturers")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="category"
                        leftSection={<IconCategory/>}
                    >
                        {t("$ui.modals.library.tabs.categories")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="states"
                        leftSection={<IconSettingsQuestion/>}
                    >
                        {t("$ui.modals.library.tabs.conditions")}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'models'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <ModelPanel/>
                </Tabs.Panel>
                <Tabs.Panel value={'manufacturer'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <ManufacturerPanel/>
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}