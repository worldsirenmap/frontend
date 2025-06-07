import useAxios from "axios-hooks";

import {Box, Center, Loader, Paper, Title} from "@mantine/core";
import {PieChart} from "@mantine/charts";
import {SirenCountByXList} from "../../../types";
import {useTranslation} from "../../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    const [{data, loading}] = useAxios<SirenCountByXList>("statistics/sirencountbycondition")

    return (
        <Box px={20} mb={40}>
            <Title px={10} pb={10} order={3}>{t("$ui.modals.statistics.sirens.bycondition.title")}</Title>
            <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} h={400}>
                <Center h={'100%'}>
                    {data && !loading
                        ? <PieChart
                            data={data.map(item => ({
                                name: item.label,
                                value: item.total,
                                color: 'wsm'
                            }))}
                            size={300}
                            withLabels
                            labelsType="value"
                            labelsPosition="outside"
                            withTooltip
                        />
                        : <Loader/>
                    }
                </Center>
            </Paper>
        </Box>
    )
}