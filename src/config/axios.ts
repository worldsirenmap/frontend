import {configure} from 'axios-hooks'
import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

configure({axios})