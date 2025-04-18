import env from "./config";
import axios,{AxiosError} from "axios";


export interface AxiosErrorResponse {
    error?:string
}
const isAxios = axios.isAxiosError;
const api = axios.create({
    //change to env
    baseURL:env.backend_url,
    headers:{
        "Content-Type":"application/json"
    }
})

export {
    api,
    isAxios,
    AxiosError
}
