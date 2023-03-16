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

//register
export const doAddDataUser = (payload : any)=>{
    // console.log(payload)
    return {
        type : UserConst.ADD_DATA_USER,
        payload
    }
}

export const doAddDataUserFailed=(payload : any)=>{
    return{
        type : UserConst.ADD_DATA_USER_FAILED,
        payload
    }
}

export const doAddDataUserSuccess =(payload :any)=> {
    return {
        type : UserConst.ADD_DATA_USER_SUCCESS,
        payload
    }
}
// Edit Profile
export const doUpdate = (payload: any)=>{
    // console.log(payload)
    return{
        type: UserConst.EDIT_DATA_PROFILE,
        payload
    }
}

export const doUpdateSuccess = (payload: any) =>{
    return {
        type: UserConst.EDIT_DATA_PROFILE_SUCCESS,
        payload 
    }
}

export const doUpdateFailed = (error : any) =>{
    return {
        type: UserConst.EDIT_DATA_PROFILE_FAILED,
        payload :error
    }
}   
 
// UPDATE PASSWORD

export const doUpdatePassword = (payload: any)=>{
    return{
        type: UserConst.UPDATE_PASSWORD,
        payload
    }
}
export const doUpdatePasswordSuccess = (payload: any)=>{
    // console.log(payload
    return{
        type: UserConst.UPDATE_PASSWORD_SUCCESS,
        payload
    }
}
export const doUpdatePasswordFailed = (error: any)=>{
    return{
        type: UserConst.UPDATE_PASSWORD_FAILED,
        error
    }
}