import {Tabs} from "@mantine/core";

import {
    IconBooks,
    IconCircleNumber1,
    IconCircleNumber2,
    IconCircleNumber3,
    IconCircleNumber4
} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import ModelPanel from "./ModelPanel.tsx";

export default () => {
    return (
        <Modal
            name={"types"}
            title={"Siren library"}
            size={"60vw"}
            icon={IconBooks}
        >
            <Tabs defaultValue={'models'}>
                <Tabs.List>
                    <Tabs.Tab value="models" leftSection={<IconCircleNumber1/>}>
                        Siren models
                    </Tabs.Tab>
                    <Tabs.Tab value="manufacturer" leftSection={<IconCircleNumber2/>}>
                        Siren manufacturer
                    </Tabs.Tab>
                    <Tabs.Tab value="category" leftSection={<IconCircleNumber3/>}>
                        Siren categories
                    </Tabs.Tab>
                    <Tabs.Tab value="states" leftSection={<IconCircleNumber4/>}>
                        Siren states
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'models'}>
                    <ModelPanel/>
                </Tabs.Panel>
                <Tabs.Panel value={'manufacturer'}>
                    asdf
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}