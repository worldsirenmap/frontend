import {Anchor, Avatar, Group, Stack, Text} from "@mantine/core";

import {useCurrentUser} from "../../../hooks/currentUser.ts";
import {useTranslation} from "../../../hooks/translation.ts";
import {useNavigation} from "../../../hooks/navigation.ts";
import {apiLogout} from "../../../hooks/backendApi.ts";
import {useState} from "react";


const Authenticated = () => {
    const {username, logoutUser} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigation()

    const doLogout = () => {
        setLoading(true)
        apiLogout().then(() => {
            logoutUser()
        }).finally(() => setLoading(false))
    }
    return (
        <Group>
            <Avatar color={'wsm'} size={56} src={'http://localhost:8080/user/avatar'}/>
            <Stack gap={0} align={'flex-start'}>
                <Text fw={'bold'} lh={'xs'}>{username}</Text>
                <Group>
                    <Anchor size={'sm'} component={'button'} onClick={() => navigate("profile")}>{t("$ui.sidebar.user.profile")} </Anchor>
                    <Anchor
                        size={'sm'}
                        component={'button'}
                        disabled={loading}
                        onClick={doLogout}
                    >{t("$ui.sidebar.user.logout")}</Anchor>
                </Group>
            </Stack>
        </Group>
    )
}

const Anonymous = () => {
    const {t} = useTranslation()
    const navigate = useNavigation()


    return (
        <Group>
            <Avatar color={'wsm'} size={56}>A</Avatar>
            <Stack gap={0} align={'flex-start'}>
                <Text fw={'bold'} lh={'xs'}>{t("$ui.sidebar.user.anonymous")}</Text>
                <Group>
                    <Anchor size={'sm'} component={'button'} onClick={() => navigate("settings")}>{t("$ui.sidebar.user.settings")} </Anchor>
                    <Anchor size={'sm'} component={'button'} onClick={() => navigate("login")}>{t("$ui.sidebar.user.login")}</Anchor>
                </Group>
            </Stack>
        </Group>
    )
}

export default () => {
    const {isAuthenticated} = useCurrentUser()

    return isAuthenticated ? <Authenticated/> : <Anonymous/>
}