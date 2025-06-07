import {Avatar, Box, Grid, Group, Paper, ScrollArea, Text} from "@mantine/core";
import {SiteChange} from "../../../types.d.ts";
import dayjs from "dayjs";

type ChangesItemProps = {
    change: SiteChange
}

type ChangesPanelProps = {
    changes: SiteChange[]
    editMode: boolean
}

const ChangeItem = ({change}: ChangesItemProps) => {
    return (
        <Box mx={20} py={5}>
            <Grid align={'center'}>
                <Grid.Col span={3}>
                    <Group wrap={'nowrap'}>
                        <Avatar></Avatar>
                        <div>
                            <Text fz={'sm'}>{change.username}</Text>
                            <Text fz={'xs'} c={'dimmed'}>{dayjs(change.changedAt).format("DD.MM.YYYY, HH:mm")} Uhr</Text>
                        </div>
                    </Group>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Paper display={'inline-block'} bg={'dark.8'} radius="lg" withBorder py={6} px={12}>
                        <Text span size={'sm'}>{change.changeEvent}</Text>
                        <Text span size={'sm'}>{change.targetId}</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>

                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default ({changes, editMode}: ChangesPanelProps) => {
    return (
        <ScrollArea>
            {changes && changes.map((change, index) => <ChangeItem key={index} change={change}/>)}
        </ScrollArea>
    )


}