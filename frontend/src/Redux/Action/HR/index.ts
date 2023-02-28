import { deptType } from "@/Redux/Constant/HR/deptType"
import { empType } from "@/Redux/Constant/HR/empType"
import { jobType } from "@/Redux/Constant/HR/jobType"
import { retry } from "redux-saga/effects"

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

export const jobSelectItem = () => {
    return{
        type: jobType.GET_SELECT_JOB
    }
}

export const addEmployee = ( payload:any ) => {
    return{
        type: empType.ADD_DATA,
        payload: payload
    }
}

export const delEmployee = ( payload:number ) => {
    return{
        type: empType.DEL_DATA,
        payload: payload
    }
}