import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai/index";
import {UserSession} from "../types.d.ts";

export type CurrentUser = {
    authenticated: boolean
    user: UserSession | null
}

const currentUserAtom = atomWithStorage<CurrentUser>("currentUser", {
    authenticated: false,
    user: null
})
export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    return {
        isAuthenticated: currentUser.authenticated,
        username: currentUser.user?.username,
        email: currentUser.user?.email,
        loginUser: (user: UserSession) => setCurrentUser({
            authenticated: true,
            user
        }),
        logoutUser: () => setCurrentUser({
            authenticated: false,
            user: null
        })
    }
}