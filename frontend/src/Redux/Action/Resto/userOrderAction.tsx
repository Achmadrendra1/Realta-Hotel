import userOrderConstant from "@/Redux/Constant/Resto/userOrderConstant";

export function doGetUserOrder(payload:any){
    return {
        type: userOrderConstant.GET_ORDER_COMPLETE,
        payload
    }
}

export function doGetUserOrderSucceed(payload:any){
    return {
        type: userOrderConstant.GET_ORDER_COMPLETE_SUCCEED,
        payload
    }
}

export function doGetUserOrderFailed(payload:any){
    return {
        type: userOrderConstant.GET_ORDER_COMPLETE_FAILED,
        payload
    }
}