import {Badge} from "@mantine/core";

export default ({category} : any) => {
    return <Badge px={4} variant="filled" size={'md'} color={'teal.9'}
                  radius="xs">{category}</Badge>
}