import PaymentConst from "@/Redux/Constant/Payment/PaymentConst";

const initialState = {
    payDashTrx: [],
    payHistoryTrx : [],
    total : 0,
    currentPage : 1
}

function payTrxHistoryReducer( state = initialState, action:any ){
    switch (action.type) {
        case PaymentConst.GET_PAYMENT_HISTORY_DASH:
            return {...state};
        case PaymentConst.GET_PAYMENT_HISTORY_DASH_SUCCESS:
            return {
                ...state, 
                payDashTrx: action.payload.data,
                total : action.payload.count,
                currentPage : action.payload.currentPage
            };
        case PaymentConst.GET_HISTORY_PAYMENT :
            return {...state}
        case PaymentConst.GET_HISTORY_PAYMENT_SUCCESS :
            return {...state, payHistoryTrx : action.payload.data, total: action.payload.total}
        default:
            return {...state};
    }
}

export default payTrxHistoryReducer;