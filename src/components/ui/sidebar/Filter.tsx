import {useForm} from "@mantine/form";
import {
    emptyMapFilter,
    MapFilter,
    mapFilter2QueryString,
    useLibraryAtom,
    useMapFilterAtom
} from "../../../config/atoms.ts";
import {Button, Divider, Loader, MultiSelect, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {axios} from "../../../config/axios.ts";


export default () => {
    const {mapFilter, setMapFilter, resetMapFilter, isFilterActive} = useMapFilterAtom()
    const {tags, models, manufacturers} = useLibraryAtom()
    const [isDirty, setDirty] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    const form = useForm<MapFilter>({
        initialValues: mapFilter,

        onValuesChange: values => {
            countSirens(values)
        }
    });

    useEffect(() => {
        countSirens(mapFilter)
    }, [mapFilter]);

    const countSirens = (values: MapFilter) => {
        setDirty(true)
        axios.get("/public/sites/count" + mapFilter2QueryString(values))
            .then(res => setCount(res.data))
            .finally(() => setDirty(false))
    }

    const setFilter = (values: MapFilter) => {
        setMapFilter(values)
        form.resetDirty()
    }

    const resetFilter = () => {
        resetMapFilter()
        form.setValues(emptyMapFilter)
        form.resetDirty()
    }

    return (
        <form onSubmit={form.onSubmit(setFilter)} style={{flex: '1 1 auto'}}>
            <Stack p={20}>
                <Divider label={"Location"}/>
                <MultiSelect
                    placeholder="Country"
                    disabled />
                <MultiSelect
                    placeholder="State"
                    disabled />
                <MultiSelect
                    placeholder="County"
                    disabled />
                <Divider label={"Siren"}/>
                <MultiSelect
                    {...form.getInputProps('mod')}
                    key={form.key('mod')}
                    placeholder="Models"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={models.map(model => ({
                        value: model.id.toString(),
                        label: model.shortname
                    }))}
                    limit={10}
                    maxValues={10}
                    disabled={models.length == 0}
                    leftSection={models.length == 0 ? <Loader size={'xs'} type={'dots'} /> : null}
                />
                <MultiSelect
                    {...form.getInputProps('man')}
                    key={form.key('man')}
                    placeholder="Manufacturers"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={manufacturers.map(manufacturer => ({
                        value: manufacturer.id.toString(),
                        label: manufacturer.shortname
                    }))}
                    limit={10}
                    maxValues={10}
                    disabled={manufacturers.length == 0}
                    leftSection={manufacturers.length == 0 ? <Loader size={'xs'} type={'dots'} /> : null}
                />
                <MultiSelect
                    {...form.getInputProps('tag')}
                    key={form.key('tag')}
                    placeholder="Tags"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={tags}
                    limit={10}
                    maxValues={10}
                    disabled={tags.length == 0}
                    leftSection={tags.length == 0 ? <Loader size={'xs'} type={'dots'} /> : null}
                />
                <MultiSelect
                    {...form.getInputProps('cat')}
                    key={form.key('cat')}
                    placeholder="Category"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={[
                        {value: "E", label: "Electronic"},
                        {value: "MH", label: "Mechanical (Handoperated)"},
                        {value: "MM", label: "Mechanical (Motorized)"},
                        {value: "ME", label: "Mechanical (Electircal)"},
                        {value: "PC", label: "Pneumatic (Compressor)"},
                        {value: "PB", label: "Pneumatic (Blower)"},
                        {value: "T", label: "Typhoon"},
                        {value: "U", label: "Unknown"},
                    ]}
                    maxValues={10}
                />
                <MultiSelect
                    {...form.getInputProps('con')}
                    key={form.key('con')}
                    placeholder="Condition"
                    clearable={true}
                    searchable={true}
                    hidePickedOptions
                    data={[
                        {value: "A", label: "Active"},
                        {value: "I", label: "Inactive"},
                        {value: "D", label: "Defect"},
                        {value: "S", label: "Removed"},
                        {value: "U", label: "Unknown"},
                    ]}
                    maxValues={10}
                />
                <Divider my={5} />
                <Button
                    disabled={!form.isDirty() || isDirty || count == 0}
                    type={'submit'}>{count == 0 ? "Nothing found" : (form.isDirty() ? "Show " : "Showing ") + count + " sirens"}</Button>
                <Button disabled={!isFilterActive} variant={'outline'} color={'red.6'} onClick={resetFilter}>Clear
                    Filter</Button>
            </Stack>
        </form>
    )
}