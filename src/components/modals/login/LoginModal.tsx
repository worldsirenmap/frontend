import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useModalAtom} from "../../../config/atoms.ts";
import {useForm} from "@mantine/form";
import {notifications} from '@mantine/notifications';
import Modal from "../Modal.tsx";
import {useLoginApi} from "../../../config/api.ts";
import {IconLogin} from "@tabler/icons-react";
import {useCurrentUser} from "../../../hooks/currentUser.ts";

export default () => {
    const {loginUser, logoutUser} = useCurrentUser()
    const {closeModal} = useModalAtom()
    const {loginPending, callLogin} = useLoginApi()

    const loginForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            token: '',
            password: ''
        }
    });

    const handleSubmit = (values: any) => {
        callLogin(values)
            .then(response => {
                let user = response.data
                notifications.show({
                    title: "Login successful",
                    message: "Hello " + user.username,
                    withCloseButton: true,
                    color: "green",
                    autoClose: 5000,
                })
                loginForm.reset()
                loginUser(user)
                closeModal()
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 401) {
                        notifications.show({
                            title: "Login failed",
                            message: "Username/Email or password not correct!",
                            withCloseButton: true,
                            color: "red",
                            autoClose: 5000,
                        })
                    }
                }
                logoutUser()
            })
    }

    return (
        <Modal
            name={"login"}
            size={"xs"}
            title={"Login"}
            icon={IconLogin}
        >
            <form onSubmit={loginForm.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        required
                        placeholder="Username or email"
                        {...loginForm.getInputProps('token')}
                        key={loginForm.key('token')}
                        disabled={loginPending}
                    />
                    <PasswordInput
                        required
                        placeholder="Password"
                        {...loginForm.getInputProps('password')}
                        key={loginForm.key('password')}
                        disabled={loginPending}
                    />
                    <Button
                        type="submit"
                        disabled={loginPending}
                        loading={loginPending}
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}