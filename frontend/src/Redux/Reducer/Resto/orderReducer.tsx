import orderConstant from "@/Redux/Constant/Resto/orderConstant";

const initialState = {
    orderMenus : []
}

function orderReducer(state = initialState, action:any){
    switch(action.type){
        case orderConstant.GET_ORDERS:
            return {...state};
        case orderConstant.GET_ORDERS_SUCCEED:
            return {...state, orderMenus: action.payload};

        case orderConstant.ADD_ORDERS:
            return {...state};
        case orderConstant.ADD_ORDERS_SUCCEED:
            return {...state, orderMenus: [...state.orderMenus, action.payload]};
        default:
            return {...state};
    }
}

export default orderReducer;