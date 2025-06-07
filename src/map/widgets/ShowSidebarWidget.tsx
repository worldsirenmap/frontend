import {ActionIcon, Box, MantineStyleProp, Tooltip} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {useSidebarAtom} from "../../config/atoms.ts";
import {useTranslation} from "../../hooks/translation.ts";

const style: MantineStyleProp = {
    position: 'fixed',
    left: 'var(--mantine-spacing-lg)',
    top: 'var(--mantine-spacing-lg)',
    borderRadius: 'var(--mantine-radius-md)',
    padding: 6,
    backgroundColor: 'var(--mantine-color-dark-6)',
    display: 'flex'
}

export default () => {
    const {openSidebar} = useSidebarAtom()
    const {t} = useTranslation()
    return (
        <Box style={style}>
            <Tooltip label={t("$ui.widgets.sidebar.tooltip")} openDelay={500}>
                <ActionIcon radius={'sm'} size={40} onClick={() => openSidebar()}>
                    <IconMenu2 size={28}/>
                </ActionIcon>
            </Tooltip>
        </Box>

    )
}