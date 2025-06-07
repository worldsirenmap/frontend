import useAxios from "axios-hooks";
import {SirenCountByXList} from "../../../types";
import {Box, Center, Loader, Paper, Table, Text, Title} from "@mantine/core";
import {useTranslation} from "../../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    const [{data, loading}] = useAxios<SirenCountByXList>("statistics/sirencountbymanufacturer")

    return (
        <Box px={40} mb={40}>
            <Title px={10} pb={10} order={3}>{t("$ui.modals.statistics.manufacturers.list.title")}</Title>
            <Paper withBorder radius={'lg'} p={20} bg={'dark.8'}>
                {data && !loading
                    ?
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>{t("$ui.modals.statistics.manufacturers.list.table.manufacturer")}</Table.Th>
                                <Table.Th colSpan={2} ta={'center'}>{t("$ui.modals.statistics.manufacturers.list.table.sirencount")}</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map(item => (
                                <Table.Tr>
                                    <Table.Td> <Text lh={1} fw={'bold'}>{t(item.label)}</Text></Table.Td>
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