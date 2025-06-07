import {Group, Select, Stack, Text, Tooltip} from "@mantine/core";
import SirenCategoryBadge from "../../../components/SirenFlagsBadge.tsx";

import ListDetailsPanel from "../../ListDetailsPanel.tsx";
import ListItem from "../../ListItem.tsx";
import {useState} from "react";
import ModelDetails from "../model/ModelDetails.tsx";
import {Manufacturer, Page} from "../../../types.d.ts";
import useAxios from "axios-hooks";
import {translateOptions, useTranslation} from "../../../hooks/translation.ts";
import SearchInput from "../components/SearchInput.tsx";
import {useMapFilter} from "../../../hooks/mapFilter.ts";
import CountryFlag from "../../../components/CountryFlag.tsx";


export default () => {
    const [actualPage, setActualPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [origin, setOrigin] = useState<string>("")
    const [selected, setSelected] = useState<number | null>(null)

    const {t, r} = useTranslation()
    const {filterData} = useMapFilter()

    const [{data, loading}] = useAxios<Page<Manufacturer>>("/library/manufacturers?origin=" + origin + "&category=" + category + "&search=" + search + "&page=" + actualPage)
    const [{data: origins, loading: originsLoading}] = useAxios<string[]>("/library/manufacturers/origins")

    return (
        <ListDetailsPanel
            paginated
            maxPages={data?.maxPages}
            actualPage={actualPage}
            setPage={setActualPage}
            listHeader={
                <Stack gap={6}>
                    <SearchInput
                        size={'xs'}
                        placeholder={t("$ui.modals.library.search.manufacturer")}
                        onSearch={(value) => {
                            setActualPage(1)
                            setSearch(value)
                        }}/>
                    <Select
                        size={'xs'}
                        radius={'xl'}
                        placeholder={t("$ui.modals.library.search.category")}
                        clearable={true}
                        data={translateOptions(filterData.cat, t)}
                        disabled={filterData.cat.length == 0}
                        onChange={(value) => {
                            setActualPage(1)
                            setCategory(value == null ? "" : value)
                        }}
                    />
                    <Select
                        size={'xs'}
                        radius={'xl'}
                        placeholder={t("$ui.modals.library.search.origin")}
                        clearable={true}
                        data={origins?.map(origin => ({
                            value: origin,
                            label: r(origin)
                        }))}
                        disabled={originsLoading || !origins}
                        onChange={(value) => {
                            setActualPage(1)
                            setOrigin(value == null ? "" : value)
                        }}
                    />
                </Stack>
            }
            listLoading={loading}
            listContent={data && data.items.map((manufacturer, index) =>
                <ListItem
                    key={index}
                    active={manufacturer.id == selected}
                    onClick={() => setSelected(manufacturer.id)}
                >
                    <Tooltip label={r(manufacturer.origin)}>
                        <CountryFlag size={16} countryCode={manufacturer.origin}/>
                    </Tooltip>
                    <Stack gap={5} style={{flex: '1 1 auto'}} my={10} ml={10}>
                        <Text lh={1} fw={'bold'}>{t(manufacturer.shortname)}</Text>
                        <Text lh={1} size={'sm'}>{t("$ui.modals.library.manufacturers.model-count", {count: manufacturer.modelCount})}</Text>
                    </Stack>
                    <Group gap={5}>
                        {manufacturer.categories.map(cat => <SirenCategoryBadge key={cat} category={cat} label={t("$data.category." + cat)}/>)}
                    </Group>
                </ListItem>
            )}
            detailsLoading={!selected}
            detailsContent={"No content"}
        />
    )
}