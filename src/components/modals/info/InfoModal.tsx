import {
    IconBrandGithub,
    IconCircleNumber1,
    IconCircleNumber2,
    IconCircleNumber3,
    IconCircleNumber4,
    IconInfoCircle, IconMail, IconWorldPin
} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {Tabs} from "@mantine/core";

export default () => {
    return (
        <Modal
            name={"info"}
            title={"WorldSirenMap Infos"}
            size={"60vw"}
            icon={IconWorldPin}
        >
            <Tabs defaultValue={'models'}>
                <Tabs.List>
                    <Tabs.Tab value="models" leftSection={<IconInfoCircle/>}>
                        Info
                    </Tabs.Tab>
                    <Tabs.Tab value="manufacturer" leftSection={<IconMail/>}>
                        Feedback
                    </Tabs.Tab>
                    <Tabs.Tab value="category" leftSection={<IconBrandGithub/>}>
                        Contribute
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Modal>
    )
}