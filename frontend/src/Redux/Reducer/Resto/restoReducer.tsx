import restoConstant from "@/Redux/Constant/Resto/restoConstant";

const initialState = {
    resto : []
}

export default function restoReducer(state=initialState, action:any){
    switch(action.type){
        case restoConstant.GET_RESTOS:
            return {...state};
        case restoConstant.GET_RESTOS_SUCCEED:
            return {...state, resto: action.payload};
        default:
            return state;
    }
}