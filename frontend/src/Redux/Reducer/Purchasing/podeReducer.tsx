import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    podes: []
}

export const PodeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_PODE:
        case PurchasingConst.ADD_PODE:
        case PurchasingConst.EDIT_PODE:
        case PurchasingConst.DEL_PODE:
            return { ...state }

        case PurchasingConst.GET_PODE_SUCCESS:
        case PurchasingConst.ADD_PODE_SUCCESS:
            return { ...state, podes: action.payload }

        case PurchasingConst.EDIT_PODE_SUCCESS:
            const index = state.podes.findIndex((item: any) => item.podhe_id === action.payload.podhe_id)
            state.podes.splice(index, 1, action.payload)
            return {
                ...state,
                podes: [...state.podes]
            }

        case PurchasingConst.DEL_PODE_SUCCESS:
            return {
                ...state,
                podes: state.podes.filter((item: any) => item.podhe_id !== action.payload)
            }

        default:
            return state
    }
}