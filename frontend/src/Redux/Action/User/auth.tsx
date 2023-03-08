import UserConst from "../../Constant/User/UserConst";

export const doLogin = (payload:any) =>{
    return {
        type: UserConst.LOGIN_USER,
        payload
    }
}

export const doLoginSuccess = (payload : any) =>{
    return {
        type: UserConst.LOGIN_USER_SUCCESS,
        payload
    }
}

export const doLoginFailed = (payload : any) =>{
    return {
        type: UserConst.LOGIN_USER_FAILED,
        payload
    }
}

export const doLogout = () =>{
    return{
        type: UserConst.LOGOUT_USER
    }
}