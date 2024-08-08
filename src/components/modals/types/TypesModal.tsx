import {Box, CloseButton, Text, Grid, Group, Input, Modal, ScrollArea, Skeleton, Stack, UnstyledButton} from "@mantine/core";
import {useTypesModalAtom} from "../../../config/atoms.ts";
import {IconSearch} from "@tabler/icons-react";

import classes from './TypesModal.module.css';

const items2 = Array(20).fill(1).map((value) =>
    <UnstyledButton key={value} className={classes.listitem}>
        <Group>
            <Skeleton width={40} height={60}/>
            <Stack gap={10} mt={5}>
                <Skeleton height={16} width={200}/>
                <Skeleton height={16} width={100}/>
            </Stack>
        </Group>
    </UnstyledButton>
)

const items = Array(20).fill(1).map((value) =>
    <UnstyledButton key={value} className={classes.listitem}>
        <Group align={'flex-start'}>
            <Box style={{width: 35, height: 50, backgroundColor: '#f00'}} ></Box>
            <Stack gap={0} mt={5}>
                <Text lh={'sm'} fw={'bold'}>Model 4</Text>
                <Text lh={'sm'} c="dimmed" size={'xs'}>Pneumatic siren (supercharged)</Text>
            </Stack>
        </Group>
    </UnstyledButton>
)

export default () => {
    const {opened, close} = useTypesModalAtom();

    return <Modal centered lockScroll={false} opened={opened} onClose={close} closeOnClickOutside={false}
                  closeOnEscape={false}
                  size={'60vw'} title="Siren types"
    >
        <Grid>
            <Grid.Col span={4}>
                    <Input size={'xs'} radius="xl" placeholder="Search ..."
                           rightSectionPointerEvents="all"
                           rightSection={
                               <CloseButton size={'xs'}/>}
                           leftSection={<IconSearch size={16}/>}
                    />
                <Stack gap={0} mt={20}>
                    <ScrollArea h={'60vh'} offsetScrollbars>
                    {items}
                    </ScrollArea>
                </Stack>
            </Grid.Col>
            <Grid.Col span={8}><Box style={{backgroundColor: '#f00'}}>assdf</Box></Grid.Col>
        </Grid>
    </Modal>
}