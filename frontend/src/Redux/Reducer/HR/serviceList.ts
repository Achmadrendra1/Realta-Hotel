import { workType } from "@/Redux/Constant/HR/workType"

const initialState = {
    tasks: [],
    employee: []
}

export const serviceListReducer = ( state:any = initialState, action:any ) => {
    const { type, payload } = action
    switch(type){
        case workType.SERVICE_WORK_SUCCESS:
            return{
                ...state,
                tasks: payload.task,
                employee: payload.employeeName
            }
        case workType.SERVICE_WORK_FAILED:
        case workType.SERVICE_WORK:
        default:
            return state
    }
}