import {ScrollArea} from "@mantine/core";
import SirensByModelsCard from "./SirensByModelsCard.tsx";

export default () => {
    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <SirensByModelsCard/>
        </ScrollArea>
    )

}