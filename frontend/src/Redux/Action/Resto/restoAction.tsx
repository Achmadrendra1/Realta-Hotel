import restoConstant from "@/Redux/Constant/Resto/restoConstant";

export function doRestoRequest(payload:any){
    return {
        type: restoConstant.GET_RESTOS,
        payload
    }
}

export function doRestoRequestSucceed(payload:any){
    return {
        type: restoConstant.GET_RESTOS_SUCCEED,
        payload
    }
}

export function doRestoRequestFailed(payload:any){
    return {
        type: restoConstant.GET_RESTOS_FAILED,
        payload
    }
}