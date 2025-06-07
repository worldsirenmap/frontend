import {Divider, Group, Paper, Stack, Text, Title} from "@mantine/core";
import useAxios from "axios-hooks";
import {ModelDetails} from "../../../types.d.ts";
import CardLoadingOverlay from "../../../components/CardLoadingOverlay.tsx";
import SirenIcon from "../../../components/SirenIcon.tsx";
import {useTranslation} from "../../../hooks/translation.ts";

type ModelDetailsProps = {
    modelId: number
}

export default (props: ModelDetailsProps) => {
    const {t} = useTranslation()

    const [{data, loading}] = useAxios<ModelDetails>("/library/model/" + props.modelId)

    return (
        <Paper withBorder radius={'lg'} p={40} bg={'dark.8'} style={{display: 'flex', flexDirection: 'column', gap: 20, position: 'relative'}}>
            {data && (
                <Stack>
                    <Group justify={'space-between'} wrap={'nowrap'} gap={100} align={'flex-end'}>
                        <Stack gap={5}>
                            <Title order={2}>{data.shortname}</Title>
                            <Text size={'md'}>
                                {Object.entries(data.manufacturers).map(([, shortname]) => t(shortname)).join(", ")}
                            </Text>
                        </Stack>
                        <SirenIcon scale={2} icon={data.icon}/>
                    </Group>
                    <Divider/>

                    <Text>{data.description || "Keine Beschreibung"}</Text>
                </Stack>

            )}
            {loading && <CardLoadingOverlay/>}
        </Paper>
    )
}