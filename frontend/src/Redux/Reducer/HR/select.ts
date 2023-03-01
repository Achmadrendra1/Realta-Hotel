import { jobType } from "@/Redux/Constant/HR/jobType"

const initialState = {
    selectJob: null,
    selectDept: null
}

export const selectReducer = ( state:any = initialState, action:any ) => {
    const { type, payload } = action
    switch(type){
        case jobType.GET_SELECT_JOB_SUCCESS:
            return{
                ...state,
                selectJob: payload
            }
        case jobType.GET_SELECT_JOB:
        default:
            return state
    }
}