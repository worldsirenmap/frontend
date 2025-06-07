import {Badge} from "@mantine/core";
import {SirenCondition} from "../types";

const colors: { [key: string]: string } = {
    ACTIVE: 'green.9',
    DEFECT: 'orange.9',
    INACTIVE: 'yellow.9',
    PLANNED: 'grape.7',
    REMOVED: 'red.9',
    UNKNOWN: 'dark.4',
}

type Props = {
    status: SirenCondition
    label: string
    showUnknown?: boolean
}

export default (props: Props) => {
    if (props.status === 'UNKNOWN' && !props.showUnknown) return null

    const color = colors[props.status]
    return (
        <Badge
            px={4}
            variant="filled"
            size={'sm'}
            color={color}
            radius="xs"
        >
            {props.label}
        </Badge>
    )
}