import {ScrollArea} from "@mantine/core";
import SirensByManufacturersCard from "./SirensByManufacturersCard.tsx";

export default () => {
    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <SirensByManufacturersCard/>
        </ScrollArea>
    )

}