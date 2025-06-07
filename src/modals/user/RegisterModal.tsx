import {Button, Group, PasswordInput, Stack, Text, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import Modal from "../Modal.tsx";
import {IconLogin} from "@tabler/icons-react";
import {useCurrentUser} from "../../hooks/currentUser.ts";
import {useTranslation} from "../../hooks/translation.ts";
import {useState} from "react";
import {useNavigation} from "../../hooks/navigation.ts";

type RegisterData = {
    username: string
    email: string
    password1: string
    password2: string
}

export default () => {
    const {loginUser, logoutUser} = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigation()


    const registerForm = useForm<RegisterData>({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            email: '',
            password1: '',
            password2: '',
        },
        validate: {
            username: isNotEmpty(t("$ui.modals.login.form.token-error")),
            email: isNotEmpty(t("$ui.modals.login.form.token-error")),
            password1: isNotEmpty(t("$ui.modals.login.form.password-error")),
            password2: isNotEmpty(t("$ui.modals.login.form.password-error"))
        }
    });

    const handleSubmit = (values: RegisterData) => {
    }

    return (
        <Modal
            title={t("$ui.modals.register.title")}
            size={500}
            icon={IconLogin}
            dynamicHeight={true}
        >
            <form onSubmit={registerForm.onSubmit(handleSubmit)}>
                <Group grow wrap={'nowrap'} align={'flex-end'}>
                    <Stack gap={10}>
                        <TextInput
                            placeholder={t("$ui.modals.register.form.username")}
                            {...registerForm.getInputProps('username')}
                            key={registerForm.key('username')}
                            disabled={loading}
                            maxLength={50}
                        />
                        <TextInput
                            placeholder={t("$ui.modals.register.form.email")}
                            {...registerForm.getInputProps('email')}
                            key={registerForm.key('email')}
                            disabled={loading}
                            maxLength={50}
                        />
                        <PasswordInput
                            placeholder={t("$ui.modals.register.form.password1")}
                            {...registerForm.getInputProps('password1')}
                            key={registerForm.key('password1')}
                            disabled={loading}
                            maxLength={50}
                        />
                        <PasswordInput
                            placeholder={t("$ui.modals.register.form.password2")}
                            {...registerForm.getInputProps('password2')}
                            key={registerForm.key('password2')}
                            disabled={loading}
                            maxLength={50}
                        />
                    </Stack>
                    <Text style={{whiteSpace: 'pre-line'}} size={'sm'}>{t("$ui.modals.register.head")}</Text>
                </Group>
                <Group justify={'center'} mt={20}>
                    <Button
                        type="submit"
                        disabled={loading || !registerForm.isDirty()}
                        loading={loading}
                    >
                        {t("$ui.modals.register.actions.register")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}