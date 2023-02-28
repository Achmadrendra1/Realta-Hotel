import { empType } from "@/Redux/Constant/HR/empType"

const initialState:object = {
    employees: []
}

export const employeesReducer = (state:object = initialState, action:any) => {
    const { type, payload } = action
    switch(type){
        case empType.DEL_DATA_SUCCES:
            return{
                ...state,
                employees: state.employees.filter((item:any) => item.id !== +payload.id)
            }
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
        case empType.DEL_DATA:
        default:
            return state
    }
}