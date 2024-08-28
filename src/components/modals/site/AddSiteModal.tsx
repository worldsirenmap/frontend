import {IconCirclePlus} from "@tabler/icons-react";
import Modal from "../Modal.tsx";

export default () => {
    return (
        <Modal
            name={"addSite"}
            size={"xs"}
            title={"Add siren site"}
            icon={IconCirclePlus}
        >
            Bla
        </Modal>
    )
}