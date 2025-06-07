import {Group, MantineSize, Text, Modal as MModal, useMantineTheme} from "@mantine/core";
import {useNavigation} from "../hooks/navigation.ts";
import {ComponentType, ReactNode} from "react";
import {IconProps} from "@tabler/icons-react";


type ModalProps = {
    children: ReactNode | ReactNode[]
    size: MantineSize | (string & {}) | number
    title: string
    icon: ComponentType<IconProps>
    dynamicHeight?: boolean
}

export default (props: ModalProps) => {
    const theme = useMantineTheme()
    const navigate = useNavigation()

    return <MModal.Root
        transitionProps={{duration: 100}}
        opened={true} onClose={() => navigate()}
        centered
        lockScroll={false}
        size={props.size}>
        <MModal.Overlay blur={2} backgroundOpacity={.6}/>
        <MModal.Content radius={'md'}>
            <MModal.Header>
                <MModal.Title>
                    <Group gap={8}>
                        <props.icon size={28} color={theme.colors.wsm[6]}></props.icon>
                        <Text fz={'lg'} fw={"bold"}>{props.title}</Text>
                    </Group>
                </MModal.Title>
                <MModal.CloseButton/>
            </MModal.Header>
            <MModal.Body h={props.dynamicHeight ? undefined : '70vh'} display={'flex'} style={{flexDirection: 'column'}}>
                {props.children}
            </MModal.Body>
        </MModal.Content>
    </MModal.Root>
}