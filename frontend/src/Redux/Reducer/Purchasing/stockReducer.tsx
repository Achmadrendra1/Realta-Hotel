import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    stocks: [],
    stcart: []
}

export const StockReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GETONE_STOCK:
            return { ...state }
        case PurchasingConst.GETONE_STOCK_SUCCESS:
            return { ...state, stocks: action.payload }

        case PurchasingConst.GET_STOCKS:
            return { ...state }
        case PurchasingConst.GET_STOCKS_SUCCESS:
            return { ...state, stocks: action.payload }

        case PurchasingConst.GET_STOCK_CART:
            return { ...state }
        case PurchasingConst.GET_STOCK_CART_SUCCESS:
            return { ...state, stcart: action.payload }

        case PurchasingConst.ADD_STOCKS:
            return { ...state }
        case PurchasingConst.ADD_STOCKS_SUCCESS:
            return { ...state, stocks: action.payload }

        case PurchasingConst.EDIT_STOCKS:
            return { ...state }
        case PurchasingConst.EDIT_STOCKS_SUCCESS:
            // state.stocks.splice(state.stocks.findIndex((i: any) => i.stockId == action.payload.stockId), 1)
            // return {
            //     ...state,
            //     stocks: [...state.stocks]
            // }
            const index = state.stocks.findIndex((item: any) => item.stockId == action.payload.stockId)
            state.stocks.splice(index, 1)
            return {
                ...state,
                stocks: [...state.stocks]
            }

        case PurchasingConst.DEL_STOCKS:
            return { ...state }
        case PurchasingConst.DEL_STOCKS_SUCCESS:
            return {
                ...state,
                stocks: state.stocks.filter((item: any) => item.stockId !== action.payload)
            }

        default:
            return state
    }
}