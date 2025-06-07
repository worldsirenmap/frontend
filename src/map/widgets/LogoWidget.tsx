import {Box, Image, MantineStyleProp} from "@mantine/core";
import {useNavigation} from "../../hooks/navigation.ts";

const style: MantineStyleProp = {
    position: 'fixed',
    bottom: 'var(--mantine-spacing-lg)',
    left: 'var(--mantine-spacing-lg)',
    cursor: 'pointer'
}

export default () => {
    const navigate = useNavigation()

    return (
        <Box style={style}>
            <Image onClick={() => navigate('info')} w={180} src={"logo.svg"}/>
        </Box>
    )
}