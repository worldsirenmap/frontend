import {ActionIcon, Box, MantineStyleProp, Tooltip} from "@mantine/core";

import {IconPlus} from "@tabler/icons-react";
import {notifications} from "@mantine/notifications";
import {useCurrentUser} from "../../hooks/currentUser.ts";
import {useNavigation} from "../../hooks/navigation.ts";
import {useTranslation} from "../../hooks/translation.ts";

const style: MantineStyleProp = {
    position: 'fixed',
    right: 'var(--mantine-spacing-lg)',
    bottom: 'var(--mantine-spacing-lg)',
    borderRadius: 'var(--mantine-radius-md)',
    padding: 6,
    backgroundColor: 'var(--mantine-color-dark-6)',
    display: 'flex'
}

export default () => {
    const {isAuthenticated} = useCurrentUser()
    const navigate = useNavigation()
    const {t} = useTranslation()

    const actionButtonClicked = () => {
        if (isAuthenticated) {
            navigate("addsite")
        } else {
            notifications.show({
                title: "Login required",
                message: "You need to be logged in to add siren sites.",
                withCloseButton: true,
                color: "orange",
                autoClose: 5000,
            })
            navigate("login")
        }
    }

    return (
        <Box style={style}>
            <Tooltip label={t("$ui.widgets.sidebar.tooltip")}>
                <ActionIcon radius={'xl'} size={50} onClick={actionButtonClicked}>
                    <IconPlus size={32}/>
                </ActionIcon>
            </Tooltip>
        </Box>
    )
}