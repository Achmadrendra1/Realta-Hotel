import { deptType } from "@/Redux/Constant/HR/deptType"
import { empType } from "@/Redux/Constant/HR/empType"
import { jobType } from "@/Redux/Constant/HR/jobType"
import { workType } from "@/Redux/Constant/HR/workType"
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

export const updateEmployee = ( payload:any ) => {
    return{
        type: empType.UPDATE_DATA,
        payload: payload
    }
}

export const getWorkOrder = () => {
    return{
        type: workType.GET_WORK_ORDER
    }
}

export const getWorkDetail = ( id:any ) => {
    return{
        type: workType.GET_DETAIL,
        payload: +id
    }
}

export const getServiceWork = () => {
    return{
        type: workType.SERVICE_WORK
    }
}

export const getDeptSelect = () => {
    return{
        type: deptType.GET_SELECT
    }
}

export const addDeptHist = (payload:any) => {
    return{
        type: empType.ADD_MUTATION,
        payload: payload
    }
}

export const addPayHist = (payload:any) => {
    return{
        type: empType.ADD_PAYHIST,
        payload: payload
    }
}

export const updateEmpPhoto = (payload:any) => {
    return{
        type: empType.UPDATE_PHOTO,
        payload: payload
    }
}

export const addWorkOrder = (payload:any) => {
    return{
        type: workType.ADD_WORK,
        payload: payload
    }
}

export const addWorkDetail = (payload:any) => {
    return{
        type: workType.ADD_WORK_DETAIL,
        payload: payload
    }
}

export const deleteWorkDetail = (payload:number) => {
    return{
        type: workType.DELETE_WORK_DETAIL,
        payload: payload
    }
}

export const updateWorkDetail = (payload:any) => {
    return{
        type: workType.UPDATE_WORK_DETAIL,
        payload: payload
    }
}