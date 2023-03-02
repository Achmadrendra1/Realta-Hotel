import { configuration } from "./url"

export const apiPicture = (method:string, url:any, data:any) => {
    return{
        method: method,
        url: `${configuration.BASE_URL}${url}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data 
    }
}