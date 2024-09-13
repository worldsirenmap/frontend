import {ScrollArea, SimpleGrid} from "@mantine/core";
import {SirenDetails} from "../../../../config/api.ts";
import SirenCard from "./components/SirenCard.tsx";
import SirenCardNew from "./components/SirenCardNew.tsx";
import {useEffect, useState} from "react";
import SirenCardEdit from "./components/SirenCardEdit.tsx";

type SirensPanelProps = {
    sirens: SirenDetails[] | undefined
    editMode: boolean
}

export default ({sirens, editMode}: SirensPanelProps) => {
    const [editId, setEditId] = useState<number | null>(null)

    useEffect(() => {
        if (!editMode) {
            setEditId(null)
        }
    }, [editMode]);

    const onNew = () => {

    }

    const onEdit = (id: number) => {
        setEditId(id)
    }

    const onDelete = (id: number) => {

    }

    const onClose = () => {
        setEditId(null)
    }

    return (
        <ScrollArea>
            <SimpleGrid cols={3} spacing={20} verticalSpacing={20} px={20}>
                {sirens && sirens.map(siren => {
                    if (siren.id === editId) {
                        return <SirenCardEdit key={siren.id} siren={siren} onClose={onClose}/>
                    } else {
                        return <SirenCard key={siren.id} siren={siren} editMode={editMode} onEdit={onEdit} onDelete={onDelete}/>
                    }
                })}
                {editMode && (
                    <SirenCardNew onNew={onNew}/>
                )}
            </SimpleGrid>
        </ScrollArea>
    )
}