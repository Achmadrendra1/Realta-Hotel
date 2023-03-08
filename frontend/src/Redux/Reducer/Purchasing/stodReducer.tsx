import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    stods: []
}

export const StodReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_STOD:
        case PurchasingConst.ADD_STOD:
        case PurchasingConst.EDIT_STOD:
        case PurchasingConst.DEL_STOD:
            return { ...state }

        case PurchasingConst.GET_STOD_SUCCESS:
        case PurchasingConst.ADD_STOD_SUCCESS:
            return { ...state, stods: action.payload }

        case PurchasingConst.EDIT_STOD_SUCCESS:
            const index = state.stods.findIndex((item: any) => item.stockdet_id == action.payload.stockdet_id)
            state.stods.splice(index, 1, action.payload)
            return {
                ...state,
                stods: [...state.stods]
            }

        case PurchasingConst.DEL_STOD_SUCCESS:
            return {
                ...state,
                stods: state.stods.filter((item: any) => item.stockdet_id !== action.payload)
            }

        default:
            return state
    }
}