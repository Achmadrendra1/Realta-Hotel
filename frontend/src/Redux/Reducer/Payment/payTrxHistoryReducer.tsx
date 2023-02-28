import PaymentConst from "@/Redux/Constant/Payment/PaymentConst";

const initialState = {
    payDashTrx: [],
    payHistoryTrx : []
}

function payTrxHistoryReducer( state = initialState, action:any ){
    switch (action.type) {
        case PaymentConst.GET_PAYMENT_HISTORY_DASH:
            return {...state};
        case PaymentConst.GET_PAYMENT_HISTORY_DASH_SUCCESS:
            return {...state, payDashTrx: action.payload};
        case PaymentConst.GET_HISTORY_PAYMENT :
            return {...state}
        case PaymentConst.GET_HISTORY_PAYMENT_SUCCESS :
            return {...state, payHistoryTrx : action.payload}
        default:
            return {...state};
    }
}

export default payTrxHistoryReducer;