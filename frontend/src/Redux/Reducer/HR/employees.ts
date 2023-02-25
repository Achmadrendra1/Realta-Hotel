import { empType } from "@/Redux/Constant/HR/empType"

const initialState = {
    employees: []
}

export const employeesReducer = (state:object = initialState, action:any) => {
    const { type, payload } = action
    switch(type){
        case empType.GET_DATA_SUCCESS:
            return{
                ...state,
                employees: payload
            }
        case empType.GET_DATA:
        default:
            return state
    }
}