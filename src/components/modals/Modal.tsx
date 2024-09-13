import {Group, Modal as MModal, Text, useMantineTheme} from "@mantine/core";
import {useModalAtom} from "../../config/atoms.ts";

export default ({children, name, size, title, icon: Icon}: any) => {
    const theme = useMantineTheme()
    const {isModalOpen, closeModal} = useModalAtom()

    return <MModal.Root
        transitionProps={{duration: 100}}
        opened={isModalOpen(name)} onClose={closeModal}
        centered
        lockScroll={false}


        size={size}>
        <MModal.Overlay blur={2} backgroundOpacity={.6}/>
        <MModal.Content radius={'md'}>
            <MModal.Header>
                <MModal.Title>
                    <Group gap={8}>
                        <Icon size={28} stroke={1.5} color={theme.colors.wsm[6]}/>
                        <Text fz={'lg'} fw={"bold"}>{title}</Text>
                    </Group>
                </MModal.Title>
                <MModal.CloseButton/>
            </MModal.Header>
            <MModal.Body>
                {children}
            </MModal.Body>
        </MModal.Content>
    </MModal.Root>
}