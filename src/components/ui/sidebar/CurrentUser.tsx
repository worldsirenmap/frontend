import {Anchor, Avatar, Group, Stack, Text} from "@mantine/core";
import {useModalAtom} from "../../../config/atoms.ts";
import {notifications} from '@mantine/notifications';
import {useLogoutApi} from "../../../config/api.ts";
import {useCurrentUser} from "../../../hooks/currentUser.ts";

const Authenticated = () => {
    const {logoutPending, callLogout} = useLogoutApi()
    const {userName, logoutUser} = useCurrentUser()


    const doLogout = () => {
        callLogout().then(_ => {
            notifications.show({
                title: "Logout successful",
                message: "Bye!",
                withCloseButton: true,
                color: "green",
                autoClose: 5000,
            })
            logoutUser()
        })
    }
    return (
        <Group>
            <Avatar color={'wsm'} size={56} src={'http://localhost:8080/user/avatar'}/>
            <Stack gap={0} align={'flex-start'}>
                <Text fw={'bold'} lh={'xs'}>{userName}</Text>
                <Group>
                    <Anchor size={'sm'} component={'button'}>Profile</Anchor>
                    <Anchor
                        size={'sm'}
                        component={'button'}
                        disabled={logoutPending}
                        onClick={doLogout}
                    >Logout</Anchor>
                </Group>
            </Stack>
        </Group>
    )
}

const Anonymous = () => {
    const {openModal} = useModalAtom()

    return (
        <Group>
            <Avatar color={'wsm'} size={56}>A</Avatar>
            <Stack gap={0} align={'flex-start'}>
                <Text fw={'bold'} lh={'xs'}>Anonymous</Text>
                <Group>
                    <Anchor size={'sm'} component={'button'} onClick={() => openModal("login")}>Login</Anchor>
                </Group>
            </Stack>
        </Group>
    )
}

export default () => {
    const {isAuthenticated} = useCurrentUser()

    return isAuthenticated ? <Authenticated/> : <Anonymous/>
}