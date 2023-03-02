import numberOrderConst from "@/Redux/Constant/Resto/numberOrderConstant";

const initialState = {
    numberOrder : []
}

export default function numberOrderReducer(state = initialState, action:any){
    switch(action.type){
        case numberOrderConst.GET_NUMBER_ORDER:
            return {...state};
        case numberOrderConst.GET_NUMBER_ORDER_SUCCEED:
            return {...state, numberOrder: action.payload};
        
        default:
            return state;
    }
}