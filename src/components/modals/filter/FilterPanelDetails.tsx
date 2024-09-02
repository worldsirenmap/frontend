import {useForm} from "@mantine/form";
import {MapFilter, useLibraryAtom, useMapFilterAtom} from "../../../config/atoms.ts";
import {Button, MultiSelect, Stack} from "@mantine/core";


export default () => {
    const {mapFilter, setMapFilter} = useMapFilterAtom()
    const {tags, models, manufacturers} = useLibraryAtom()

    const form = useForm<MapFilter>({
        mode: 'uncontrolled',
        initialValues: mapFilter,
    });

    const onSetFiler = (values: MapFilter) => {
        setMapFilter(values)
    }

    return (
        <form onSubmit={form.onSubmit(onSetFiler)}>
            <Stack>
                <MultiSelect
                    {...form.getInputProps('mod')}
                    key={form.key('mod')}
                    label="Filter for siren models (max. 10)"
                    placeholder="Select models"
                    clearable={true}
                    searchable={true}
                    data={models.map(model => ({
                        value: model.id.toString(),
                        label: model.shortname
                    }))}
                    limit={10}
                    maxValues={10}
                />
                <MultiSelect
                    {...form.getInputProps('man')}
                    key={form.key('man')}
                    label="Filter for siren manufacturers (max. 10)"
                    placeholder="Select manufacturers"
                    clearable={true}
                    searchable={true}
                    data={manufacturers.map(manufacturer => ({
                        value: manufacturer.id.toString(),
                        label: manufacturer.shortname
                    }))}
                    limit={10}
                    maxValues={10}
                />
                <MultiSelect
                    {...form.getInputProps('tag')}
                    key={form.key('tag')}
                    label="Filter for custom tags (max. 10)"
                    placeholder="Select tags"
                    clearable={true}
                    searchable={true}
                    data={tags}
                    limit={10}
                    maxValues={10}
                />
                <Button disabled={!form.isDirty} type={'submit'}>Set Filter</Button>
            </Stack>
        </form>
    )
}