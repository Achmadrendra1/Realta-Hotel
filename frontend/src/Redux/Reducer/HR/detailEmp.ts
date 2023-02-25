import { empType } from "@/Redux/Constant/HR/empType"

const initialState = {
    details: []
}

export const detailEmpReducer = ( state:object = initialState, action:any ) => {
    const { type, payload } = action
    switch(type){
        case empType.GET_DETAIL_SUCCESS:
            return{
                ...state,
                details: payload
            }
        case empType.GET_DETAIL:
        default:
            return state
    }
} 