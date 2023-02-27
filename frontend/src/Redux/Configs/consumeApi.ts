import { configuration } from "./url"

export const API = (method:string, url:any, data?:any) => {
    return{
        method: method,
        url: `${configuration.BASE_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        data: data 
    }
}