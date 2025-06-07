import {configure} from 'axios-hooks'
import Axios, {AxiosRequestConfig} from "axios";
import {notifications} from "@mantine/notifications";

export const axios = Axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
})

const apiCall = <T>(url: string, message: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        axios<T>(url, config)
            .then((response) => {
                notifications.show({
                    title: "OK",
                    message: message,
                    withCloseButton: true,
                    color: "green",
                    autoClose: 5000,
                })
                resolve(response.data)
            })
            .catch((error) => {
                notifications.show({
                    title: "Error",
                    message: error.message,
                    withCloseButton: true,
                    color: "red",
                    autoClose: 5000,
                })
                reject(error)
            })
    })
}

export const apiGet = <T>(url: string, message: string): Promise<T> => apiCall<T>(url, message, {method: 'GET'})
export const apiDelete = <T>(url: string, message: string): Promise<T> => apiCall<T>(url, message, {method: 'DELETE'})
export const apiPost = <T>(url: string, data: unknown, message: string): Promise<T> => apiCall<T>(url, message, {method: 'POST', data})
export const apiPut = <T>(url: string, data: unknown, message: string): Promise<T> => apiCall<T>(url, message, {method: 'PUT', data})

configure({axios})