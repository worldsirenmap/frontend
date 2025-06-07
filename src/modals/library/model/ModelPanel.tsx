import {Select, Stack, Text} from "@mantine/core";
import SirenFlagsBadge from "../../../components/SirenFlagsBadge.tsx";

import ListDetailsPanel from "../../ListDetailsPanel.tsx";
import ListItem from "../../ListItem.tsx";
import {useState} from "react";
import ModelDetails from "./ModelDetails.tsx";
import {Model, Page} from "../../../types.d.ts";
import useAxios from "axios-hooks";
import SirenIcon from "../../../components/SirenIcon.tsx";
import SearchInput from "../components/SearchInput.tsx";
import {useMapFilter} from "../../../hooks/mapFilter.ts";
import {translateOptions, useTranslation} from "../../../hooks/translation.ts";


export default () => {
    const [actualPage, setActualPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [selected, setSelected] = useState<number | null>(null)

    const {t} = useTranslation()
    const {filterData} = useMapFilter()

    const [{data, loading}] = useAxios<Page<Model>>("/library/models?category=" + category + "&search=" + search + "&page=" + actualPage)

    return (
        <ListDetailsPanel
            paginated
            maxPages={data?.maxPages}
            actualPage={actualPage}
            setPage={setActualPage}
            filterActive={(search != null && search.length > 0) || (category != null && category.length > 0)}
            filter={
                <Stack gap={10}>
                    <SearchInput
                        placeholder={t("$ui.modals.library.search.model")}
                        value={search}
                        onSearch={(value) => {
                            setActualPage(1)
                            setSearch(value)
                        }}/>
                    <Select
                        w={250}
                        placeholder={t("$ui.modals.library.search.category")}
                        clearable={true}
                        data={translateOptions(filterData.cat, t)}
                        disabled={filterData.cat.length == 0}
                        onChange={(value) => {
                            setActualPage(1)
                            setCategory(value == null ? "" : value)
                        }}
                        value={category}
                        comboboxProps={{withinPortal: false}}
                    />
                </Stack>
            }
            listLoading={loading}
            listContent={data && data.items.map((model, index) =>
                <ListItem
                    key={index}
                    active={model.id == selected}
                    onClick={() => setSelected(model.id)}
                >
                    <SirenIcon icon={model.icon}/>
                    <Stack gap={5} style={{flex: '1 1 auto'}}>
                        <Text lh={1} fw={'bold'}>{t(model.shortname)}</Text>
                        <Text lh={1} size={'sm'}>{t(model.manufacturer)}</Text>
                    </Stack>
                    <SirenFlagsBadge category={model.category} size={20}/>
                </ListItem>
            )}
            detailsLoading={!selected}
            detailsContent={selected ? <ModelDetails modelId={selected}/> : null}
        />
    )
}