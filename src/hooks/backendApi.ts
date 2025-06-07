import {NewSirenData, UserSession} from "../types.d.ts";
import {apiDelete, apiPost, apiPut} from "../config/axios.ts";

// Login, Register, Password reset
export const apiLogin = (token: string, password: string): Promise<UserSession> =>
    apiPost("/auth/login", {token, password}, "Login successful!")

export const apiLogout = (): Promise<never> =>
    apiPost("/auth/logout", null, "Logout successful!")

// Site siren
export const apiCreateSiren = (siteId: number, data: NewSirenData): Promise<unknown> =>
    apiPost("/site/" + siteId + "/sirens", data, "Siren created!")

export const apiUpdateSiren = (siteId: number, sirenId: number, data: NewSirenData): Promise<unknown> =>
    apiPut("/site/" + siteId + "/siren/" + sirenId, data, "Siren updated!")

export const apiDeleteSiren = (siteId: number, sirenId: number): Promise<unknown> =>
    apiDelete("/site/" + siteId + "/siren/" + sirenId, "Siren deleted!")


