import {ScrollArea, SimpleGrid} from "@mantine/core";
import {SirenOptions, SiteSirenList} from "../../../types.d.ts";
import SirenCard from "./components/SirenCard.tsx";
import SirenCardNew from "./components/SirenCardNew.tsx";
import {useEffect, useState} from "react";
import SirenCardEdit from "./components/SirenCardEdit.tsx";
import useAxios from "axios-hooks";

type SirensPanelProps = {
    siteId: number
    sirens: SiteSirenList
    onRefresh: () => void
    editMode: boolean
}

export default ({siteId, sirens, onRefresh, editMode}: SirensPanelProps) => {
    const [editId, setEditId] = useState<number | null>(null)

    const [{data: sirenOptions}] = useAxios<SirenOptions>("/library/sirenoptions")

    useEffect(() => {
        if (!editMode) {
            setEditId(null)
        }
    }, [editMode]);

    const onClose = (mustRefresh: boolean) => {
        setEditId(null)
        if (mustRefresh) {
            onRefresh()
        }
    }

    return (
        <ScrollArea>
            <SimpleGrid cols={2} spacing={20} verticalSpacing={20} px={20}>
                {sirens && sirens.map(siren => (siren.id === editId)
                    ? <SirenCardEdit key={siren.id} siteId={siteId} sirenId={siren.id} sirenData={siren} sirenOptions={sirenOptions} onClose={onClose}/>
                    : <SirenCard key={siren.id} siren={siren} editMode={editMode} onEdit={() => setEditId(siren.id)}/>
                )}
                {editMode && editId !== -1 && (
                    <SirenCardNew key={-1} onNew={() => setEditId(-1)}/>
                )}
                {editMode && editId === -1 && (
                    <SirenCardEdit key={-1} siteId={siteId} onClose={onClose} sirenOptions={sirenOptions}/>
                )}
            </SimpleGrid>
        </ScrollArea>
    )
}