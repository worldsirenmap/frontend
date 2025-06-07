import {TagsInput, TagsInputProps} from "@mantine/core";
import {useMapFilter} from "../../../../../hooks/mapFilter.ts";

type SirenTagsInputProps = TagsInputProps & {}

export default (props: SirenTagsInputProps) => {
    const {filterData} = useMapFilter()
    return (
        <TagsInput
            {...props}
            disabled={!filterData.tag}
            data={filterData.tag}
            splitChars={[',', ' ', ':', ';']}
            acceptValueOnBlur
        />
    )
}