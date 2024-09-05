import {Stack, Text} from "@mantine/core";
import SirenCategoryBadge from "../../ui/SirenCategoryBadge.tsx";

import ListDetailsPanel from "../ListDetailsPanel.tsx";
import ListItem from "../ListItem.tsx";
import {useEffect, useMemo, useState} from "react";
import ModelDetails from "./ModelDetails.tsx";
import {Model} from "../../../config/api.ts";


export default () => {
    const [selected, setSelected] = useState<number | null>(null)
    const models: Model[] = useMemo(()=>([]),[])

    useEffect(() => {
        setSelected(models[0]?.id)
    }, [models]);

    return (
        <ListDetailsPanel
            listLoading={models.length == 0}
            listContent={models.map((model, index) =>
                <ListItem
                    key={index}
                    active={model.id == selected}
                    onClick={() => setSelected(model.id)}
                >
                    <img alt="Icon" src={'https://api.worldsirenmap.net/assets/siren-icons/' + model.icon + '.svg'}/>
                    <Stack gap={5} style={{flex: '1 1 auto'}}>
                        <Text lh={1} fw={'bold'}>{model.shortname}</Text>
                        <Text lh={1} size={'sm'}>{model.manufacturer}</Text>
                    </Stack>
                    <SirenCategoryBadge category={model.category}/>
                </ListItem>
            )}
            detailsLoading={!selected}
            detailsContent={selected ? <ModelDetails id={selected} />: "No content"}
        />
    )
}