import useAxios from "axios-hooks";
import {SirenCountByModelList} from "../../../types";
import {Box, Center, Group, Loader, Paper, Stack, Table, Text, Title} from "@mantine/core";
import {useTranslation} from "../../../hooks/translation.ts";
import SirenIcon from "../../../components/SirenIcon.tsx";

export default () => {
    const {t} = useTranslation()
    const [{data, loading}] = useAxios<SirenCountByModelList>("statistics/sirencountbymodel")

    return (
        <Box px={40} mb={40}>
            <Title px={10} pb={10} order={3}>{t("$ui.modals.statistics.models.list.title")}</Title>
            <Paper withBorder radius={'lg'} p={20} bg={'dark.8'}>
                {data && !loading
                    ?
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>{t("$ui.modals.statistics.models.list.table.model")}</Table.Th>
                                <Table.Th colSpan={2} ta={'center'}>{t("$ui.modals.statistics.models.list.table.sirencount")}</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map(item => (
                                <Table.Tr>
                                    <Table.Td>
                                        <Group>
                                            <SirenIcon scale={0.75} icon={item.icon}/>
                                            <Stack gap={5} style={{flex: '1 1 auto'}}>
                                                <Text lh={1} fw={'bold'}>{t(item.model)}</Text>
                                                <Text lh={1} size={'sm'}>{t(item.manufacturer)}</Text>
                                            </Stack>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td w={100} ta={'right'}>{item.total}</Table.Td>
                                    <Table.Td w={100}>{item.percentage}%</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    :
                    <Center h={360}>
                        <Loader/>
                    </Center>
                }
            </Paper>
        </Box>
    )
}