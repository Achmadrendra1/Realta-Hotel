import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    vepros: []
}

export const VeproReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_VEPRO:
        case PurchasingConst.ADD_VEPRO:
        case PurchasingConst.EDIT_VEPRO:
        case PurchasingConst.DEL_VEPRO:
            return { ...state }

        case PurchasingConst.GET_VEPRO_SUCCESS:
        case PurchasingConst.ADD_VEPRO_SUCCESS:
            return { ...state, vepros: action.payload }

        case PurchasingConst.EDIT_VEPRO_SUCCESS:
            const index = state.vepros.findIndex((item: any) => item.vestock_id === action.payload.vestock_id)
            state.vepros.splice(index, 1, action.payload)
            return {
                ...state,
                vepros: [...state.vepros]
            }

        case PurchasingConst.DEL_VEPRO_SUCCESS:
            return {
                ...state,
                vepros: state.vepros.filter((item: any) => item.vestock_id !== action.payload)
            }

        default:
            return state
    }
}