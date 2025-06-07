import {Group, Select, SelectProps, Stack, Text} from "@mantine/core";
import SirenCategoryBadge from "../../../../../components/SirenFlagsBadge.tsx";
import {SirenOption, SirenOptions} from "../../../../../types.d.ts";
import SirenIcon from "../../../../../components/SirenIcon.tsx";
import {useTranslation} from "../../../../../hooks/translation.ts";

type SirenSelectProps = SelectProps & {
    sirenoptions: SirenOptions | undefined
}

export default (props: SirenSelectProps) => {
    const {t} = useTranslation()
    return (
        <Select
            {...props}
            disabled={!props.sirenoptions}
            searchable
            limit={20}
            nothingFoundMessage={t("$ui.modals.site.sirens.edit.type")}
            data={props.sirenoptions?.map(sirenoption => ({
                value: sirenoption.manufacturerId + ":" + sirenoption.modelId,
                label: t(sirenoption.manufacturer) + " " + t(sirenoption.model),
                ...sirenoption
            }))}
            renderOption={({option, checked}) => {
                const sirenoption = option as unknown as SirenOption
                return (
                    <Group w={'100%'} gap={'sm'}>
                        <SirenIcon icon={sirenoption.icon}/>
                        <Stack gap={5} style={{flex: '1 1 auto'}}>
                            <Text lh={1} c={checked ? 'wsm.6' : undefined} size={'sm'} fw={'bold'}>{t(sirenoption.model)}</Text>
                            <Text lh={1} c={checked ? 'wsm.6' : undefined} size={'xs'}>{t(sirenoption.manufacturer)}</Text>
                        </Stack>
                        <SirenCategoryBadge category={sirenoption.category} label={t("$data.category." + sirenoption.category)}/>
                    </Group>
                )
            }}
        />
    )
}