import { workType } from "@/Redux/Constant/HR/workType"

const initialState = {
    data: []
}

export const workorderDetailReducer = ( state:any = initialState, action:any ) => {
    const { payload, type } = action
    switch(type){
        case workType.UPDATE_WORK_DETAIL_SUCCESS:
            const idx = state.data.findIndex((item:any) => item.wodeId == payload.wodeId)
            state.data.splice(idx, 1, payload)
            return{
                ...state,
                data: [...state.data]
            }
        case workType.DELETE_WORK_DETAIL_SUCCESS:
            return{
                ...state,
                data: state.data.filter((item:any) => item.wodeId !== payload )
            }
        case workType.ADD_WORK_DETAIL_SUCCESS:
            return{
                ...state,
                data: [...state.data, payload]
            }
        case workType.GET_DETAIL_SUCCESS:
            return{
                ...state,
                data: payload
            }
        case workType.UPDATE_WORK_DETAIL:
        case workType.DELETE_WORK_DETAIL:
        case workType.ADD_WORK_DETAIL:
        case workType.GET_DETAIL_FAILED:
        case workType.GET_DETAIL:
        default:
            return state
    }
}