import UserConst from "../../Constant/User/UserConst";

export const doGetUser = () =>{
    return {
        type: UserConst.GET_DATA_USER
    }
}

export const doGetDataSuccess = (data : any) =>{
    return {
        type: UserConst.DATA_USER_SUCCESS,
        payload :data,
    }
}

export const doGetDataFailed = (error : any) =>{
    return {
        type: UserConst.DATA_USER_FAILED,
        payload :error
    }
}