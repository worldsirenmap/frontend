import {IconCheck, IconEdit, IconPlus, IconTrash, IconX} from "@tabler/icons-react";
import {ActionIcon, Tooltip} from "@mantine/core";

type ActionIconProps = {
    tooltip: string
    disabled?: boolean,
    onClick: () => void
}

export const NewActionIcon = (props: ActionIconProps) => {
    return (
        <Tooltip label={props.tooltip}>
            <ActionIcon
                disabled={props.disabled}
                size={32}
                onClick={props.onClick}
            >
                <IconPlus size={24}/>
            </ActionIcon>
        </Tooltip>
    )
}

export const EditActionIcon = (props: ActionIconProps) => {
    return (
        <Tooltip label={props.tooltip}>
            <ActionIcon
                disabled={props.disabled}
                size={24}
                onClick={props.onClick}
            >
                <IconEdit size={16}/>
            </ActionIcon>
        </Tooltip>
    )
}

export const DeleteActionIcon = (props: ActionIconProps) => {
    return (
        <Tooltip label={props.tooltip}>
            <ActionIcon
                disabled={props.disabled}
                variant={'outline'}
                size={24}
                color={'red.9'}
                onClick={props.onClick}
            >
                <IconTrash size={16}/>
            </ActionIcon>
        </Tooltip>
    )
}

export const CancelActionIcon = (props: ActionIconProps) => {
    return (
        <Tooltip label={props.tooltip}>
            <ActionIcon
                disabled={props.disabled}
                size={24}
                color={'red.9'}
                onClick={props.onClick}
            >
                <IconX size={16}/>
            </ActionIcon>
        </Tooltip>
    )
}

export const SubmitActionIcon = (props: Omit<ActionIconProps, 'onClick'>) => {
    return (
        <Tooltip label={props.tooltip}>
            <ActionIcon
                disabled={props.disabled}
                size={24}
                color={'green.9'}
                type={'submit'}
            >
                <IconCheck size={16}/>
            </ActionIcon>
        </Tooltip>
    )
}