import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    pohes: []
}

export const PoheReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_POHE:
        case PurchasingConst.ADD_POHE:
        case PurchasingConst.EDIT_POHE:
        case PurchasingConst.DEL_POHE:
            return { ...state }

        case PurchasingConst.GET_POHE_SUCCESS:
        case PurchasingConst.ADD_POHE_SUCCESS:
            return { ...state, pohes: action.payload }

        case PurchasingConst.EDIT_POHE_SUCCESS:
            const index = state.pohes.findIndex((item: any) => item.pove_id === action.payload.pove_id)
            state.pohes.splice(index, 1, action.payload)
            return {
                ...state,
                pohes: [...state.pohes]
            }

        case PurchasingConst.DEL_POHE_SUCCESS:
            return {
                ...state,
                pohes: state.pohes.filter((item: any) => item.pove_id !== action.payload)
            }

        default:
            return state
    }
}