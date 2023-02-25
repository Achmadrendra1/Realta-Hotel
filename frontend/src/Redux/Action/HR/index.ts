import { deptType } from "@/Redux/Constant/HR/deptType"
import { empType } from "@/Redux/Constant/HR/empType"

export const GetDeptAll = () => {
    return{
        type: deptType.GET_DATA
    }
}

export const AddDept = (payload:any) => {
    return{
        type: deptType.ADD_DATA,
        payload: payload
    }
}

export const UpdateDept = (payload:any) => {
    return{
        type: deptType.UPDATE_DATA,
        payload: payload
    }
}

export const DeleteDept = (payload:number) => {
    return{
        type: deptType.DELETE_DATA,
        payload: payload
    }
}

export const getEmpData = () => {
    return{
        type: empType.GET_DATA
    }
}

export const getDetailEmp = (payload:number) => {
    return{
        type: empType.GET_DETAIL,
        payload: payload
    }
}