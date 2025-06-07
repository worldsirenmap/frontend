import useAxios from "axios-hooks";
import {SirenCountByMonthList} from "../../../types";
import {useMemo} from "react";
import {Box, Center, Loader, Paper, Title} from "@mantine/core";
import {CompositeChart} from "@mantine/charts";
import {useTranslation} from "../../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    const [{data, loading}] = useAxios<SirenCountByMonthList>("statistics/sirencountbymonth")

    const maxAdded = useMemo(() => data ? Math.round(Math.max(...data.map(x => x.added)) / 1000) * 1000 : 0, [data])
    const maxTotal = useMemo(() => data ? Math.round(Math.max(...data.map(x => x.total)) / 10000) * 10000 : 0, [data])

    return (
        <Box px={20} mb={40}>
            <Title px={10} pb={10} order={3}>{t("$ui.modals.statistics.sirens.bymonth.title")}</Title>
            <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} h={400}>
                {data && !loading
                    ? <CompositeChart
                        h={"100%"}
                        withLegend
                        data={data}
                        series={[
                            {name: "added", label: t("$ui.modals.statistics.sirens.bymonth.added"), type: 'bar', yAxisId: 'right', color: 'dark.5'},
                            {name: "total", label: t("$ui.modals.statistics.sirens.bymonth.total"), type: 'area'}
                        ]}
                        dataKey={"month"}
                        curveType='natural'
                        withDots={false}
                        withRightYAxis
                        yAxisProps={{domain: [0, maxTotal * 2]}}
                        rightYAxisProps={{domain: [0, maxAdded * 2]}}
                        barProps={{barSize: 40}}
                        gridProps={{}}
                    />
                    :
                    <Center h={'100%'}>
                        <Loader/>
                    </Center>
                }
            </Paper>
        </Box>
    )
}