import {useState} from "react";
import {useTimeout} from "@mantine/hooks";

export const useAutoResetState = (delay: number): [boolean, (newState: boolean) => void] => {
    const [state, setState] = useState<boolean>(false)
    const {start, clear} = useTimeout(() => setState(false), delay)

    const setter = (newState: boolean) => {
        setState(newState)
        if (newState) start()
        else clear()
    }

    return [
        state,
        setter,
    ]
}