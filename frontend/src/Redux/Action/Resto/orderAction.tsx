import orderConstant from "@/Redux/Constant/Resto/orderConstant";

export function doOrder(){
    return {
        type: orderConstant.GET_ORDERS
    }
}

export function doOrderSucceed(payload:any){
    return {
        type: orderConstant.GET_ORDERS_SUCCEED,
        payload
    }
}

export function doOrderFailed(payload:any){
    return {
        type: orderConstant.GET_ORDERS_FAILED,
        payload
    }
}

export function doAddOrder(payload:any){
    return {
        type: orderConstant.ADD_ORDERS,
        payload
    }
}

export function doAddOrderSucceed(payload:any){
    return {
        type: orderConstant.ADD_ORDERS_SUCCEED,
        payload
    }
}

export function doAddOrderFailed(payload:any){
    return {
        type: orderConstant.ADD_ORDERS_FAILED,
        payload
    }
}