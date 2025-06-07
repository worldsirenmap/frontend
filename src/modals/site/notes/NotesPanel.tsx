import {Avatar, Box, Grid, Group, Paper, ScrollArea, Text} from "@mantine/core";
import {SiteNote} from "../../../types.d.ts";
import dayjs from "dayjs";


type NotesItemProps = {
    note: SiteNote
}

type NotesPanelProps = {
    notes: SiteNote[]
    editMode: boolean
}

const NotesItem = ({note}: NotesItemProps) => {
    return (
        <Box mx={20} py={5}>
            <Grid align={'center'}>
                <Grid.Col span={3}>
                    <Group wrap={'nowrap'}>
                        <Avatar></Avatar>
                        <div>
                            <Text fz={'sm'}>{note.userName}</Text>
                            <Text fz={'xs'} c={'dimmed'}>{dayjs(note.created).format("DD.MM.YYYY, HH:mm")} Uhr</Text>
                        </div>
                    </Group>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Paper display={'inline-block'} bg={'dark.8'} radius="lg" withBorder py={6} px={12}>
                        <Text span size={'sm'}>{note.note}</Text>
                        {note.modified && <Text mt={5} fz={'xs'} c={'dimmed'}>Geändert {dayjs(note.modified).format("DD.MM.YYYY, HH:mm")} Uhr</Text>}
                    </Paper>
                </Grid.Col>
                <Grid.Col span={1}>

                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default ({notes, editMode}: NotesPanelProps) => {
    return (
        <ScrollArea>
            {notes && notes.map((note, index) => <NotesItem key={index} note={note}/>)}
        </ScrollArea>
    )


}