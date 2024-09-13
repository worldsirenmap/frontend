import {ActionIcon, Anchor, Badge, Button, Center, Divider, Group, Overlay, Paper, Stack, Text, useMantineTheme} from "@mantine/core";
import StatusBadge from "../../../../ui/SirenStatusBadge.tsx";
import {IconEdit, IconExternalLink, IconTrash} from "@tabler/icons-react";
import DeleteActionIcon from "../../../../ui/DeleteActionIcon.tsx";
import {SirenDetails} from "../../../../../config/api.ts";
import {useState} from "react";
import {useTimeout} from "@mantine/hooks";

type SirenCardProps = {
    siren: SirenDetails
    editMode: boolean
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

export default ({siren, editMode, onEdit, onDelete}: SirenCardProps) => {

    return (
        <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} style={{display: 'flex', flexDirection: 'column', gap: 20, position: 'relative'}}>
            <Group gap={'lg'}>
                <img alt="Icon" height={80} src={'https://api.worldsirenmap.net/assets/siren-icons/' + siren.icon + '.svg'}/>
                <Stack gap={5}>
                    <Text lh={1} fw={'bold'}>{siren.model}</Text>
                    <Text pb={10} lh={1} size={'sm'}>{siren.manufacturer}</Text>
                    <StatusBadge status={siren.condition}/>
                </Stack>
            </Group>
            <Divider/>
            <Text px={10} style={{flex: '1 1 auto'}} size={'sm'}>{siren.description ?? "$no_description"}</Text>
            {siren.links && siren.links.length > 0 && siren.links.map(link => {
                const matches = /^\[(.+)\]\((.+)\)$/.exec(link)
                return <Anchor px={10} size={'sm'} href={matches![2]}><Group gap={5}><IconExternalLink size={14}/> {matches![1]}</Group></Anchor>
            })}


            {siren.tags && siren.tags.length > 0 && (
                <>
                    <Divider/>
                    <Group>
                        {siren.tags.map(tag => <Badge radius={'xl'} size={'sm'} color={'dark.4'}>{tag}</Badge>)}
                    </Group>
                </>
            )}

            {editMode && (
                <Group gap={10} justify={'flex-end'}>
                    <ActionIcon size={24} onClick={() => onEdit(siren.id)}><IconEdit size={16}/></ActionIcon>
                </Group>
            )}
        </Paper>
    )
}