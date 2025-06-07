import {Button, Group, PasswordInput, Stack, Text, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import Modal from "../Modal.tsx";
import {IconLogin} from "@tabler/icons-react";
import {useTranslation} from "../../hooks/translation.ts";
import {useState} from "react";
import {useNavigation} from "../../hooks/navigation.ts";

type ResetData = {
    token: string,
    password1: string
    password2: string
}

export default () => {
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigation()

    const resetForm = useForm<ResetData>({
        mode: 'uncontrolled',
        initialValues: {
            token: '',
            password1: '',
            password2: ''
        },
        validate: {
            token: isNotEmpty(t("$ui.modals.login.form.token-error")),
            password1: isNotEmpty(t("$ui.modals.login.form.password-error")),
            password2: isNotEmpty(t("$ui.modals.login.form.password-error"))
        }
    });

    const handleSubmit = (values: ResetData) => {

    }

    return (
        <Modal
            title={t("$ui.modals.passwordreset.title")}
            size={500}
            icon={IconLogin}
            dynamicHeight={true}
        >
            <form onSubmit={resetForm.onSubmit(handleSubmit)}>
                <Group grow wrap={'nowrap'} align={'flex-end'}>
                    <Stack gap={10}>
                        <TextInput
                            placeholder={t("$ui.modals.passwordreset.form.token")}
                            {...resetForm.getInputProps('token')}
                            key={resetForm.key('token')}
                            disabled={loading}
                            maxLength={50}
                        />
                        <PasswordInput
                            placeholder={t("$ui.modals.passwordreset.form.password1")}
                            {...resetForm.getInputProps('password1')}
                            key={resetForm.key('password1')}
                            disabled={loading}
                            maxLength={50}
                        />
                        <PasswordInput
                            placeholder={t("$ui.modals.passwordreset.form.password2")}
                            {...resetForm.getInputProps('password2')}
                            key={resetForm.key('password')}
                            disabled={loading}
                            maxLength={50}
                        />
                    </Stack>
                    <Text style={{whiteSpace: 'pre-line'}} size={'sm'}>{t("$ui.modals.passwordreset.head")}</Text>
                </Group>
                <Group justify={'center'} mt={20}>
                    <Button
                        type="submit"
                        disabled={loading || !resetForm.isDirty()}
                        loading={loading}
                    >
                        {t("$ui.modals.passwordreset.actions.send")}
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}