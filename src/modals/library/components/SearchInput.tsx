import {TextInput, TextInputProps} from "@mantine/core";
import {KeyboardEvent, useState} from "react";
import {useTimeout} from "@mantine/hooks";
import {IconSearch} from "@tabler/icons-react";

type SearchInputProps = Omit<TextInputProps, 'onChange'> & {
    onSearch: (value: string) => void
}

export default ({onSearch, ...props}: SearchInputProps) => {
    const [value, setValue] = useState<string>(props.value as string)
    const {start, clear} = useTimeout((value) => onSearch(value), 600)

    const onChange = (newValue: string) => {
        setValue(newValue)
        clear()
        start(newValue)
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            onSearch(value)
        }
    }

    return (
        <TextInput
            {...props}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            onKeyDown={onKeyDown}
            leftSection={<IconSearch size={14}/>}
        />
    )
}