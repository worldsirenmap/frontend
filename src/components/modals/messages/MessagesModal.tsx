import {IconMessage} from "@tabler/icons-react";
import Modal from "../Modal.tsx";

export default () => {
    return (
        <Modal
            name={"messages"}
            title={"Messages"}
            size={"60vw"}
            icon={IconMessage}
        >
            Coming soon
        </Modal>
    )
}