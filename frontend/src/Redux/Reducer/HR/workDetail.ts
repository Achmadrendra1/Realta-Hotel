import { workType } from "@/Redux/Constant/HR/workType"

const initialState = {
    data: []
}

export const workorderDetailReducer = ( state:any = initialState, action:any ) => {
    const { payload, type } = action
    switch(type){
        case workType.GET_DETAIL_SUCCESS:
            return{
                ...state,
                data: payload
            }
        case workType.GET_DETAIL_FAILED:
        case workType.GET_DETAIL:
        default:
            return state
    }
}