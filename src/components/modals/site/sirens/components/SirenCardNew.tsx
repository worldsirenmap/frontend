import {ActionIcon, Paper} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";

type SirenCardNewProps = {
    onNew: () => void
}

export default ({onNew}: SirenCardNewProps) => {
    return (
        <Paper withBorder radius={'lg'} p={20} style={{borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ActionIcon size={24} onClick={() => onNew()}><IconPlus size={16}/></ActionIcon>
        </Paper>
    )
}