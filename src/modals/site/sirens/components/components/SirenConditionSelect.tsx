import StatusBadge from "../../../../../components/SirenStatusBadge.tsx";
import {Select, SelectProps} from "@mantine/core";
import {useMapFilter} from "../../../../../hooks/mapFilter.ts";
import {translateOptions, useTranslation} from "../../../../../hooks/translation.ts";

type SirenConditionSelectProps = SelectProps & {}

export default (props: SirenConditionSelectProps) => {
    const {filterData} = useMapFilter()
    const {t} = useTranslation()

    return (
        <Select
            {...props}
            allowDeselect={false}
            disabled={!filterData.con}
            data={translateOptions(filterData.con, t)}
            renderOption={({option}) => <StatusBadge status={option.value} showUnknown={true} label={option.label}/>}
        />
    )

}