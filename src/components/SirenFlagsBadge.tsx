import {Group, Tooltip} from "@mantine/core";
import {
    IconAccessPoint,
    IconAperture,
    IconBatteryAutomotive,
    IconGasStation,
    IconGauge,
    IconHandStop,
    IconPlug,
    IconPropeller,
    IconRotate,
    IconScubaDivingTank,
    IconSettingsQuestion,
    IconVolume
} from "@tabler/icons-react";
import {SirenCategory, SirenPowerSource} from "../types";
import {useTranslation} from "../hooks/translation.ts";

type Props = {
    category?: SirenCategory
    powerSource?: SirenPowerSource
    rotational?: boolean
    size?: number
}

export default (props: Props) => {
    const {t} = useTranslation()

    const categoryLabel = props.category ? t("$data.category." + props.category) : null
    const powerSourceLabel = props.powerSource ? t("$data.powersource." + props.powerSource) : null

    return (
        <Group gap={0}>
            {props.category === 'ELECTRONIC' && (
                <Tooltip label={categoryLabel}>
                    <IconVolume size={props.size}/>
                </Tooltip>
            )}
            {(props.category === 'MECHANIC' || props.category === 'SUPERCHARGED' || props.category === 'PNEUMATIC') && (
                <Tooltip label={t("$data.category.MECHANIC")}>
                    <IconAperture size={props.size}/>
                </Tooltip>
            )}
            {props.category === 'SUPERCHARGED' && (
                <Tooltip label={categoryLabel}>
                    <IconPropeller size={props.size}/>
                </Tooltip>
            )}
            {props.category === 'PNEUMATIC' && (
                <Tooltip label={categoryLabel}>
                    <IconGauge size={props.size}/>
                </Tooltip>
            )}
            {props.category === 'HORN' && (
                <Tooltip label={categoryLabel}>
                    <IconAccessPoint size={props.size}/>
                </Tooltip>
            )}

            {props.powerSource === 'MAINS' && (
                <Tooltip label={powerSourceLabel}>
                    <IconPlug size={props.size}/>
                </Tooltip>
            )}
            {props.powerSource === 'BATTERY' && (
                <Tooltip label={powerSourceLabel}>
                    <IconBatteryAutomotive size={props.size}/>
                </Tooltip>
            )}
            {props.powerSource === 'ENGINE' && (
                <Tooltip label={powerSourceLabel}>
                    <IconGasStation size={props.size}/>
                </Tooltip>
            )}
            {props.powerSource === 'MANUAL' && (
                <Tooltip label={powerSourceLabel}>
                    <IconHandStop size={props.size}/>
                </Tooltip>
            )}
            {props.powerSource === 'AIRTANK' && (
                <Tooltip label={powerSourceLabel}>
                    <IconScubaDivingTank size={props.size}/>
                </Tooltip>
            )}
            {props.powerSource === 'OTHER' && (
                <Tooltip label={powerSourceLabel}>
                    <IconSettingsQuestion size={props.size}/>
                </Tooltip>
            )}
            {props.rotational === true && (
                <Tooltip label={t("$data.rotational")}>
                    <IconRotate size={props.size}/>
                </Tooltip>
            )}
        </Group>
    )
}