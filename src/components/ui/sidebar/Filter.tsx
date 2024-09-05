import {useForm} from "@mantine/form";
import {Button, Divider, Loader, MultiSelect, Select, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {axios} from "../../../config/axios.ts";
import {emptyMapFilter, MapFilter, mapFilter2QueryString, useMapFilter} from "../../../config/mapFilter.ts";


export default () => {
    const {
        currentFilter,
        filterData,
        setCurrentFilter,
        resetCurrentFilter,
        isMapFilterActive,
        loadStateData,
        loadCountyData,
        unloadStateData,
        unloadCountyData,
        statesLoading,
        countiesLoading
    } = useMapFilter()
    const [isDirty, setDirty] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)

    const form = useForm<MapFilter>({
        initialValues: currentFilter,

        onValuesChange: (values, previous) => {
            if (values.ctr) {
                if (values.ctr != previous.ctr) {
                    loadStateData(values.ctr)
                    unloadCountyData()
                    values.sta = null
                    values.cty = null
                }
                if (values.sta) {
                    if (values.sta != previous.sta) {
                        loadCountyData(values.ctr, values.sta)
                        values.cty = null
                    }
                } else if (previous.sta) {
                    unloadCountyData()
                    values.cty = null
                }
            } else if (previous.ctr) {
                unloadStateData()
                unloadCountyData()
                values.sta = null
                values.cty = null
            }

            countSirens(values)
        }
    });

    useEffect(() => {
        countSirens(currentFilter)
    }, [currentFilter]);

    const countSirens = (values: MapFilter) => {
        setDirty(true)
        axios.get("/public/sites/count" + mapFilter2QueryString(values))
            .then(res => setCount(res.data))
            .finally(() => setDirty(false))
    }

    const setFilter = (values: MapFilter) => {
        setCurrentFilter(values)
        form.resetDirty()
    }

    const resetFilter = () => {
        resetCurrentFilter()
        form.setValues(emptyMapFilter)
        form.resetDirty()
    }

    return (
        <form onSubmit={form.onSubmit(setFilter)} style={{flex: '1 1 auto'}}>
            <Stack p={20}>
                <Divider label={"Location"}/>
                <Select
                    {...form.getInputProps('ctr')}
                    key={form.key('ctr')}
                    placeholder="Country"
                    clearable={true}
                    searchable={true}
                    data={filterData.ctr}
                    disabled={filterData.ctr.length == 0}
                    leftSection={filterData.ctr.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <Select
                    {...form.getInputProps('sta')}
                    key={form.key('sta')}
                    placeholder="State"
                    clearable={true}
                    searchable={true}
                    data={filterData.sta}
                    disabled={filterData.sta.length == 0}
                    leftSection={statesLoading? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <Select
                    {...form.getInputProps('cty')}
                    key={form.key('cty')}
                    placeholder="County"
                    clearable={true}
                    searchable={true}
                    data={filterData.cty}
                    disabled={filterData.cty.length == 0}
                    leftSection={countiesLoading? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <Divider label={"Siren"}/>

                <MultiSelect
                    {...form.getInputProps('mod')}
                    key={form.key('mod')}
                    placeholder="Models"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={filterData.mod}
                    maxValues={10}
                    disabled={filterData.mod.length == 0}
                    leftSection={filterData.mod.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <MultiSelect
                    {...form.getInputProps('man')}
                    key={form.key('man')}
                    placeholder="Manufacturers"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={filterData.man}
                    maxValues={10}
                    disabled={filterData.man.length == 0}
                    leftSection={filterData.man.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <MultiSelect
                    {...form.getInputProps('cat')}
                    key={form.key('cat')}
                    placeholder="Category"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={filterData.cat}
                    maxValues={10}
                    disabled={filterData.cat.length == 0}
                    leftSection={filterData.cat.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <MultiSelect
                    {...form.getInputProps('con')}
                    key={form.key('con')}
                    placeholder="Condition"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={filterData.con}
                    maxValues={10}
                    disabled={filterData.con.length == 0}
                    leftSection={filterData.con.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <MultiSelect
                    {...form.getInputProps('tag')}
                    key={form.key('tag')}
                    placeholder="Tags"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={filterData.tag}
                    maxValues={10}
                    disabled={filterData.tag.length == 0}
                    leftSection={filterData.tag.length == 0 ? <Loader size={'xs'} type={'dots'}/> : null}
                />
                <Divider my={5}/>
                <Button
                    disabled={!form.isDirty() || isDirty || count == 0}
                    type={'submit'}>{count == 0 ? "Nothing found" : (form.isDirty() ? "Show " : "Showing ") + count + " sirens"}</Button>
                <Button disabled={!isMapFilterActive} variant={'outline'} color={'red.6'} onClick={resetFilter}>Clear
                    Filter</Button>
            </Stack>
        </form>
    )
}