import userOrderConstant from "@/Redux/Constant/Resto/userOrderConstant";

const initialState = {
    userOrder : []
}

export default function userOrderReducer(state = initialState, action:any){
    switch(action.type){
        case userOrderConstant.GET_ORDER_COMPLETE: 
            return {...state};
        case userOrderConstant.GET_ORDER_COMPLETE_SUCCEED:
            return {...state, userOrder: action.payload};

        default:
            return state;
    }
}