import { deptType } from "@/Redux/Constant/HR/deptType"

const initialState = {
    data: []
}

export const DeptReducer = ( state:any = initialState, action:any) => {
    const { type, payload } = action
    switch(type){
        case deptType.GET_DATA_SUCCESS:
            return{
                ...state,
                data: payload
            }
        case deptType.ADD_DATA_SUCCESS:
            return{
                ...state,
                data: [...state.data, payload]
            }
        case deptType.UPDATE_DATA_SUCCESS:
            const index = state.data.findIndex((item:any) => item.deptId == payload.deptId)
            state.data.splice(index, 1, payload)
            return{
                ...state,
                data: [...state.data]
            }
        case deptType.DELETE_DATA_SUCCESS:
            return{
                ...state,
                data: state.data.filter((item:any) => item.deptId !== payload)
            }
        case deptType.GET_DATA:
        case deptType.GET_DATA_FAILED:
        case deptType.ADD_DATA:
        case deptType.ADD_DATA_FAILED:
        case deptType.UPDATE_DATA:
        case deptType.UPDATE_DATA_FAILED:
        default:
            return state
    }
}