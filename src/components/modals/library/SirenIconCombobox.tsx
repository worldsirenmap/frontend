import {Combobox, Image, ScrollArea, UnstyledButton, useCombobox} from "@mantine/core";

export default = () => {
    const combobox = useCombobox();
    return (
        <Combobox store={combobox} width={'min-content'}>
            <Combobox.Target>
                <UnstyledButton
                    onClick={() => combobox.openDropdown()}
                >
                    <Image
                        src={'https://api.worldsirenmap.net/assets/siren-icons/unknown.svg'}
                    />
                </UnstyledButton>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type="always" mah={200}>
                        <Combobox.Option key={'els'} value={'els'}>
                            <Image w={40} h={60} mx={20} my={10} src={'https://api.worldsirenmap.net/assets/siren-icons/els.svg'}/>
                        </Combobox.Option>
                        <Combobox.Option key={'e57'} value={'e57'}>
                            <Image w={40} h={60} mx={20} my={10} src={'https://api.worldsirenmap.net/assets/siren-icons/e57.svg'}/>
                        </Combobox.Option>
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}
