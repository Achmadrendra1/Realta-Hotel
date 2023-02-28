import { empType } from "@/Redux/Constant/HR/empType"

const initialState:object = {
    employees: []
}

export const employeesReducer = (state:object = initialState, action:any) => {
    const { type, payload } = action
    switch(type){
        case empType.ADD_DATA_SUCCESS: 
            return{
                ...state,
                employees: [...state.employees, payload] 
            }
        case empType.GET_DATA_SUCCESS:
            return{
                ...state,
                employees: payload
            }
        case empType.GET_DATA:
        case empType.GET_DETAIL_FAILED:
        case empType.ADD_DATA:
        default:
            return state
    }
}