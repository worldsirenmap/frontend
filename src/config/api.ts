import useAxios from "axios-hooks";

export const useLoginApi = () => {
    const [{loading}, execute] = useAxios({
        url: "/auth/login",
        method: "POST"
    }, {
        manual: true
    })

    return {
        loginPending: loading,
        callLogin: (values: any) => execute({data: values})
    }
}

export const useLogoutApi = () => {
    const [{loading}, execute] = useAxios({
        url: "/auth/logout",
        method: "POST"
    }, {
        manual: true
    })

    return {
        logoutPending: loading,
        callLogout: () => execute()
    }
}

export type NearbySite = {
    id: number
    longitude: number,
    latitude: number,
    distance: number,
    icon: string,
    sirens: [{
        manufacturer: string,
        model: string,
        category: string,
        icon: string,
        condition: string
    }]
}

export type Model = {
    id: number
    shortname: string
    manufacturer: string
    category: string
    icon: string
}

export type Manufacturer = {
    id: number
    shortname: string
}