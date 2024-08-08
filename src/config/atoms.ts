import {atom, useAtom} from 'jotai'

const typesModalAtom = atom(false)

export const useTypesModalAtom = () => {
    const [opened, setOpen] = useAtom(typesModalAtom)
    return {
        open: () => setOpen(true),
        close: () => setOpen(false),
        opened
    }
}