import {Center, Loader, Overlay, useMantineTheme} from "@mantine/core";

export default () => {
    const theme = useMantineTheme()
    return (
        <Overlay color={theme.colors.dark[8]} radius={'lg'} backgroundOpacity={0.75} blur={2}>
            <Center h={'100%'}>
                <Loader/>
            </Center>
        </Overlay>
    )
}