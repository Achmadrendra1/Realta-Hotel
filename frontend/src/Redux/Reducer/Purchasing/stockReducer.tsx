import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    stocks: [],
    stcart: []
}

export const StockReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_STOCKS:
        case PurchasingConst.GET_STOCK_CART:
        case PurchasingConst.ADD_STOCKS:
        case PurchasingConst.EDIT_STOCKS:
        case PurchasingConst.DEL_STOCKS:
            return { ...state }

        case PurchasingConst.GET_STOCKS_SUCCESS:
        case PurchasingConst.ADD_STOCKS_SUCCESS:
            return { ...state, stocks: action.payload }

        case PurchasingConst.GET_STOCK_CART_SUCCESS:
            return { ...state, stcart: action.payload }


        case PurchasingConst.EDIT_STOCKS_SUCCESS:
            const index = state.stocks.findIndex((item: any) => item.stockId == action.payload.stockId)
            state.stocks.splice(index, 1, action.payload)
            return {
                ...state,
                stocks: [...state.stocks]
            }

        case PurchasingConst.DEL_STOCKS_SUCCESS:
            return {
                ...state,
                stocks: state.stocks.filter((item: any) => item.stockId !== action.payload)
            }

        default:
            return state
    }
}