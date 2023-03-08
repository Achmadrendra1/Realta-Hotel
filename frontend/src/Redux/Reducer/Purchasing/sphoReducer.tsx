import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    sphos: []
}

export const SphoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_SPHO:
        case PurchasingConst.ADD_SPHO:
        case PurchasingConst.EDIT_SPHO:
        case PurchasingConst.DEL_SPHO:
            return { ...state }

        case PurchasingConst.GET_SPHO_SUCCESS:
        case PurchasingConst.ADD_SPHO_SUCCESS:
            return { ...state, sphos: action.payload }

        case PurchasingConst.EDIT_SPHO_SUCCESS:
            const index = state.sphos.findIndex((item: any) => item.sphoId == action.payload.sphoId)
            state.sphos.splice(index, 1, action.payload)
            return {
                ...state,
                sphos: [...state.sphos]
            }

        case PurchasingConst.DEL_SPHO_SUCCESS:
            return {
                ...state,
                sphos: state.sphos.filter((item: any) => item.sphoId !== action.payload)
            }

        default:
            return state
    }
}