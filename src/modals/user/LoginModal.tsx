import {Anchor, Button, PasswordInput, Stack, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import Modal from "../Modal.tsx";
import {IconLogin} from "@tabler/icons-react";
import {useCurrentUser} from "../../hooks/currentUser.ts";
import {useTranslation} from "../../hooks/translation.ts";
import {apiLogin} from "../../hooks/backendApi.ts";
import {useState} from "react";
import {useNavigation} from "../../hooks/navigation.ts";

type LoginData = {
    token: string,
    password: string
}

export default () => {
    const {loginUser, logoutUser} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigation()


    const loginForm = useForm<LoginData>({
        mode: 'uncontrolled',
        initialValues: {
            token: '',
            password: ''
        },
        validate: {
            token: isNotEmpty(t("$ui.modals.login.form.token-error")),
            password: isNotEmpty(t("$ui.modals.login.form.password-error"))
        }
    });

    const handleSubmit = (values: LoginData) => {
        setLoading(true)
        apiLogin(values.token, values.password)
            .then(user => {
                loginUser(user)
                navigate()
            })
            .catch(() => {
                logoutUser()
            })
            .finally(() => setLoading(false))
    }

    return (
        <Modal
            title={t("$ui.modals.login.title")}
            size={250}
            icon={IconLogin}
            dynamicHeight={true}
        >
            <form onSubmit={loginForm.onSubmit(handleSubmit)}>
                <Stack gap={10}>
                    <TextInput
                        placeholder={t("$ui.modals.login.form.token")}
                        {...loginForm.getInputProps('token')}
                        key={loginForm.key('token')}
                        disabled={loading}
                        maxLength={50}
                    />
                    <PasswordInput
                        placeholder={t("$ui.modals.login.form.password")}
                        {...loginForm.getInputProps('password')}
                        key={loginForm.key('password')}
                        disabled={loading}
                        maxLength={50}
                    />
                    <Button
                        type="submit"
                        disabled={loading || !loginForm.isDirty()}
                        loading={loading}
                    >
                        {t("$ui.modals.login.actions.login")}
                    </Button>
                    <Stack gap={0}>
                    <Anchor size={'sm'} onClick={() => navigate("register")}>{t("$ui.modals.login.actions.register")}</Anchor>
                    <Anchor size={'sm'} onClick={() => navigate("passwordreset")}>{t("$ui.modals.login.actions.reset")}</Anchor>
                    </Stack>
                </Stack>
            </form>
        </Modal>
    )
}