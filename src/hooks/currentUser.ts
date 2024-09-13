import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai/index";

export type CurrentUser = {
    authenticated: boolean
    userId: number | null
    userName: string | null
}

const currentUserAtom = atomWithStorage<CurrentUser>("currentUser", {
    authenticated: false,
    userName: null,
    userId: null
})
export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    return {
        isAuthenticated: currentUser.authenticated,
        userName: currentUser.userName,
        userId: currentUser.userId,
        loginUser: (user: any) => setCurrentUser({
            authenticated: true,
            userName: user.username,
            userId: user.id
        }),
        logoutUser: () => setCurrentUser({
            authenticated: false,
            userName: null,
            userId: null
        })
    }
}