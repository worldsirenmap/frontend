import {Badge} from "@mantine/core";

const availableStatus = {
    A: {
        color: 'green.9',
        label: 'Aktiv'
    },
    I: {
        color: 'yellow.9',
        label: 'Inaktiv'
    },
    D: {
        color: 'red.9',
        label: 'Defekt'
    },
    S: {
        color: 'dark.9',
        label: 'Demontiert'
    }
}

export default ({status} : any) => {
    if (status == 'U') return null

    // @ts-ignore
    const v = availableStatus[status]
    return <Badge px={4} variant="filled" size={'sm'} color={v.color}
                  radius="xs">{v.label}</Badge>
}