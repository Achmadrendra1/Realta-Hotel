import numberOrderConst from "@/Redux/Constant/Resto/numberOrderConstant";

export function doOrderNumberReq(){
    return {
        type: numberOrderConst.GET_NUMBER_ORDER
    }
}

export function doOrderNumberSucceed(payload:any){
    return {
        type : numberOrderConst.GET_NUMBER_ORDER_SUCCEED,
        payload
    }
}

export function doOrderNumberFailed(payload:any){
    return {
        type : numberOrderConst.GET_NUMBER_ORDER_FAILED,
        payload
    }
}