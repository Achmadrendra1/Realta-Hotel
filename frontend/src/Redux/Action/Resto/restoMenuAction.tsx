import menuConstant from "@/Redux/Constant/Resto/menuConstant"

export const doMenuRequest = (payload:any) => {
    return {
        type: menuConstant.GET_MENUS,
        payload
    }
}

export const doMenuRequestSucceed = (payload:any) => {
    return {
        type: menuConstant.GET_MENUS_SUCCEED,
        payload
    }
}

export const doMenuRequestFailed = (payload:any) => {
    return {
        type: menuConstant.GET_MENUS_FAILED,
        payload
    }
}

export const doUpdateMenu = (payload:any) => {
    return{
        type: menuConstant.UPDATE_MENU,
        payload
    }
}

export const doUpdateMenuSucceed = (payload:any) => {
    return{
        type: menuConstant.UPDATE_MENU_SUCCEED,
        payload
    }
}


export const doUpdateMenuFailed = (payload:any) => {
    return{
        type: menuConstant.UPDATE_MENU_FAILED,
        payload
    }
}


export const doAddMenu = (payload:any) => {
    return {
        type: menuConstant.ADD_MENU,
        payload
    }
}

export const doAddMenuSucceed = (payload:any) => {
    return {
        type: menuConstant.ADD_MENU_SUCCEED,
        payload
    }
}

export const doAddMenuFailed = (payload:any) => {
    return {
        type: menuConstant.ADD_MENU_FAILED,
        payload
    }
}

export const doDeleteMenu = (payload:any) => {
    return {
        type: menuConstant.DELETE_MENU,
        payload
    }
}

export const doDeleteMenuSucceed = (payload:any) => { 
    return {
        type: menuConstant.DELETE_MENU_SUCCEED,
        payload
    }
}

export const doDeleteMenuFailed = (payload:any) => { 
    return {
        type: menuConstant.DELETE_MENU_FAILED,
        payload
    }
}