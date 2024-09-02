import {Flex, UnstyledButton} from "@mantine/core";

import classes from "./Modal.module.css"
import {MouseEventHandler, ReactNode} from "react";

export type ListItemProps = {
    children: ReactNode
    active: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default ({children, active, onClick}: ListItemProps) => {
    return (
        <UnstyledButton
            className={classes.listitem}
            onClick={onClick}
            mod={{active}}
        >
            <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="nowrap"
            >
                {children}
            </Flex>
        </UnstyledButton>
    )
}