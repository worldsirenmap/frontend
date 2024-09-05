import {IconFilter, IconFilterHeart, IconFilterStar} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {Tabs} from "@mantine/core";

export default () => {
    return (
        <Modal
            name={"filter"}
            title={"Filter"}
            size={"60vw"}
            icon={IconFilter}
        >
            <Tabs defaultValue={'filter'}>
                <Tabs.List>
                    <Tabs.Tab value="filter" leftSection={<IconFilter/>}>
                        Filter
                    </Tabs.Tab>
                    <Tabs.Tab value="savedFilter" leftSection={<IconFilterStar/>}>
                        Own saved Filters
                    </Tabs.Tab>
                    <Tabs.Tab value="communityFilter" leftSection={<IconFilterHeart/>}>
                        Community created Filters
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'filter'}>
                    Coming soon!
                </Tabs.Panel>
                <Tabs.Panel value={'savedFilter'}>
                    Coming soon!
                </Tabs.Panel>
                <Tabs.Panel value={'communityFilter'}>
                    Coming soon!
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}