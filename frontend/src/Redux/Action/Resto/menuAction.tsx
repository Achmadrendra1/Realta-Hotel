import constant from "@/Redux/Constant/Resto/constant"


export const doMenu = () => {
    return {
        type: constant.GET_MENU_DETAIL
    }
}

export const doMenuSucceed = (payload:any) => {
    return {
        type: constant.GET_MENU_DETAIL_SUCCEED,
        payload
    }
}

export const doMenuFailed = (payload: any) => {
    return {
        type: constant.GET_MENU_DETAIL_FAILED,
        payload
    }
}