import Modal from "../Modal.tsx";
import {IconLogin} from "@tabler/icons-react";
import {useTranslation} from "../../hooks/translation.ts";
import {useState} from "react";
import {useNavigation} from "../../hooks/navigation.ts";
import {Button} from "@mantine/core";

export default () => {
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigation()

    return (
        <Modal
            title={t("$ui.modals.login.title")}
            size={250}
            icon={IconLogin}
            dynamicHeight={true}
        >
            Account aktivieren. WIP
            <Button onClick={() => navigate('login')}>Zum Login</Button>
        </Modal>
    )
}