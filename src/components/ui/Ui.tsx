import Sidebar from "./sidebar/Sidebar.tsx";
import {ActionIcon, Box} from "@mantine/core";
import classes from "./Ui.module.css";
import {IconMenu2, IconPlus} from "@tabler/icons-react";
import {useModalAtom, useSidebarAtom} from "../../config/atoms.ts";
import {notifications} from '@mantine/notifications';
import {useCurrentUser} from "../../hooks/currentUser.ts";

export const Ui = () => {
    const {openModal} = useModalAtom()
    const {openSidebar} = useSidebarAtom()
    const {isAuthenticated} = useCurrentUser()

    const actionButtonClicked = () => {
        if (isAuthenticated) {
            openModal("addSite")
        } else {
            notifications.show({
                title: "Login required",
                message: "You need to be logged in to add siren sites.",
                withCloseButton: true,
                color: "orange",
                autoClose: 5000,
            })
            openModal("login")
        }
    }

    return (
        <>
            <Box className={classes.sidebarButton}>
                <ActionIcon radius={'sm'} size={48} onClick={() => openSidebar()}>
                    <IconMenu2 size={32}/>
                    {/*<IconFilterFilled size={32}/>*/}
                </ActionIcon>
            </Box>
            <Box className={classes.actionButton}>
                <ActionIcon radius={'xl'} size={64} onClick={actionButtonClicked}>
                    <IconPlus size={32}/>
                </ActionIcon>
            </Box>
            <Sidebar/>
        </>
    )
}