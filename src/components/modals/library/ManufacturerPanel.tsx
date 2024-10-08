import {Stack, Text} from "@mantine/core";
import ListDetailsPanel from "../ListDetailsPanel.tsx";
import ListItem from "../ListItem.tsx";
import {useEffect, useMemo, useState} from "react";
import ManufacturerDetails from "./ManufacturerDetails.tsx";
import {Manufacturer} from "../../../config/api.ts";

export default () => {
    const [selected, setSelected] = useState<number | null>(null)
    const manufacturers: Manufacturer[] = useMemo(()=>([]),[])

    useEffect(() => {
        setSelected(manufacturers[0]?.id)
    }, [manufacturers]);

    return (
        <ListDetailsPanel
            listLoading={manufacturers.length == 0}
            listContent={manufacturers.map((manufacturer, index) =>
                <ListItem
                    key={index}
                    active={manufacturer.id == selected}
                    onClick={() => setSelected(manufacturer.id)}
                >
                    <Stack gap={5} style={{flex: '1 1 auto'}}>
                        <Text lh={1} fw={'bold'}>{manufacturer.shortname}</Text>
                    </Stack>
                </ListItem>
            )}
            detailsLoading={!selected}
            detailsContent={selected ? <ManufacturerDetails id={selected} />: "No content"}
        />
    )
}