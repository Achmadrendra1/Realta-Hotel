import { workType } from "@/Redux/Constant/HR/workType"

const initialState = {
    data: []
}

export const workorderReducer = ( state:any = initialState, action:any ) => {
    const { payload, type } = action
    switch(type){
        case workType.GET_WORK_ORDER_SUCCESS:
            return{
                ...state,
                data: payload
            }
        case workType.GET_WORK_ORDER:
        default:
            return state
    }
}