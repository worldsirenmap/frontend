import {Center, Group, Stack, Text} from "@mantine/core";
import {IconMoodEmpty} from "@tabler/icons-react";

export default () => {
    return (
        <Center style={{flex: '1 1 auto'}}>
            <Stack align={'center'}>
                <Group>
                    <IconMoodEmpty/>
                    <Text>There is nothing to show yet.</Text>
                </Group>
            </Stack>
        </Center>
    )
}