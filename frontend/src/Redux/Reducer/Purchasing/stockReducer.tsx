import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    stocks: [],
    stock: []
}

export default function StockReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_STOCK:
            return { ...state }
        case PurchasingConst.GETONE_STOCK_SUCCESS:
            return { ...state, stocks: action.payload }
        case PurchasingConst.GET_STOCKS:
            return { ...state }
        case PurchasingConst.GET_STOCKS_SUCCESS:
            return { ...state, stocks: action.payload }
        case PurchasingConst.ADD_STOCKS:
            return { ...state }
        case PurchasingConst.ADD_STOCKS_SUCCESS:
            return { ...state, stocks: action.payload }
        case PurchasingConst.EDIT_STOCKS:
            return { ...state }
        case PurchasingConst.EDIT_STOCKS_SUCCESS:
            state.stocks.splice(state.stocks.findIndex((i: any) => i.stockId == action.payload.stockId), 1)
            return {
                ...state,
                stock: [...state.stocks]
            }
        case PurchasingConst.DEL_STOCKS:
            return { ...state }
        case PurchasingConst.DEL_STOCKS_SUCCESS:
            return {
                ...state,
                stock: state.stocks.filter((stocks: any) => stocks.id !== +action.payload)
            }
        default:
            return state
    }
}