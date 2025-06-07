import {Group, ScrollArea} from "@mantine/core";
import SirensByMonthCard from "./SirensByMonthCard.tsx";
import SirensByCategoryCard from "./SirensByCategoryCard.tsx";
import SirensByConditionCard from "./SirensByConditionCard.tsx";

export default () => {

    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <SirensByMonthCard/>
            <Group grow gap={0}>
                <SirensByCategoryCard/>
                <SirensByConditionCard/>
            </Group>
        </ScrollArea>
    )
}