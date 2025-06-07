import {ScrollArea} from "@mantine/core";
import SirensByUserCard from "./SirensByUserCard.tsx";

export default () => {
    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <SirensByUserCard/>
        </ScrollArea>
    )

}