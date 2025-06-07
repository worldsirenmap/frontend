import {ActionIcon, Paper} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {NewActionIcon} from "./components/CardActionIcon.tsx";
import {useTranslation} from "../../../../hooks/translation.ts";

type SirenCardNewProps = {
    onNew: () => void
}

export default ({onNew}: SirenCardNewProps) => {
    const {t} = useTranslation()
    return (
        <Paper withBorder radius={'lg'} p={20} style={{borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <NewActionIcon tooltip={t("$ui.modals.site.sirens.actions.add")} onClick={onNew}/>
        </Paper>
    )
}