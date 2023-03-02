import userMenuConstant from "@/Redux/Constant/Resto/userMenuConstant";

export function doUserMenuReq(payload:any){
    return {
        type: userMenuConstant.GET_MENU_USER,
        payload
    }
}

export function doUserMenuReqSucceed(payload:any){
    return {
        type: userMenuConstant.GET_MENU_USER_SUCCEED,
        payload
    }
}

export function doUserMenuReqFaild(payload:any){
    return {
        type: userMenuConstant.GET_MENU_USER_FAILED,
        payload
    }
}