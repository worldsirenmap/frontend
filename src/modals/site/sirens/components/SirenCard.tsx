import {Badge, Divider, Group, Paper, Stack, Text} from "@mantine/core";
import StatusBadge from "../../../../components/SirenStatusBadge.tsx";
import SirenFlagsBadge from "../../../../components/SirenFlagsBadge.tsx";
import {useTranslation} from "../../../../hooks/translation.ts";
import {EditActionIcon} from "./components/CardActionIcon.tsx";
import SirenIcon from "../../../../components/SirenIcon.tsx";
import {SirenDetails} from "../../../../types";

type SirenCardProps = {
    siren: SirenDetails
    editMode: boolean
    onEdit: () => void
}

export default ({siren, editMode, onEdit}: SirenCardProps) => {
    const {t} = useTranslation()
    return (
        <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} style={{display: 'flex', flexDirection: 'column', gap: 20, position: 'relative'}}>
            <Group gap={'lg'}>
                <SirenIcon scale={1.6} icon={siren.icon}/>
                <Stack style={{flex: '1 1 auto'}} gap={0}>
                    <Group justify={'space-between'} mb={20}>
                        <div>
                            <Text lh={1.3} size={'lg'} fw={'bold'}>{t(siren.model)}</Text>
                            <Text lh={1.3} size={'sm'}>{t(siren.manufacturer)}</Text>
                        </div>

                    </Group>
                    <Group justify={'space-between'}>
                        <StatusBadge showUnknown={true} status={siren.condition} label={t("$data.condition." + siren.condition)}/>
                        <SirenFlagsBadge
                            powerSource={siren.powerSource}
                            category={siren.category}
                            rotational={siren.rotational}
                        />
                    </Group>
                </Stack>
            </Group>
            <Divider/>
            <Text px={10} style={{flex: '1 1 auto'}} size={'sm'}>{siren.description ?? "$no_description"}</Text>
            {siren.tags && siren.tags.length > 0 && (
                <>
                    <Divider/>
                    <Group>
                        {siren.tags.map(tag => <Badge radius={'xl'} size={'sm'} color={'dark.4'}>{tag}</Badge>)}
                    </Group>
                </>
            )}

            {editMode && (
                <Group gap={10} justify={'space-between'}>
                    <Text size={'xs'} c={'dark.4'}>ID: {siren.id}</Text>
                    <EditActionIcon tooltip={t("$ui.modals.site.sirens.actions.edit")} onClick={() => onEdit()}/>
                </Group>
            )}
        </Paper>
    )
}