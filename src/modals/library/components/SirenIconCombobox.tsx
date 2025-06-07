import {Combobox, ScrollArea, UnstyledButton, useCombobox} from "@mantine/core";
import SirenIcon from "../../../components/SirenIcon.tsx";

export default = () => {
    const combobox = useCombobox();
    return (
        <Combobox store={combobox} width={'min-content'}>
            <Combobox.Target>
                <UnstyledButton
                    onClick={() => combobox.openDropdown()}
                >
                    <SirenIcon icon={'unknown'} />
                </UnstyledButton>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type="always" mah={200}>
                        <Combobox.Option key={'els'} value={'els'}>
                            <SirenIcon icon={'els'} />
                        </Combobox.Option>
                        <Combobox.Option key={'e57'} value={'e57'}>
                            <SirenIcon icon={'e57'} />
                        </Combobox.Option>
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}
