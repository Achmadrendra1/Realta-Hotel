import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    pohes: [],
    pohe: []
}

export default function PoheReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_POHE:
            return { ...state }
        case PurchasingConst.GETONE_POHE_SUCCESS:
            return { ...state, pohes: action.payload }
        case PurchasingConst.GET_POHE:
            return { ...state }
        case PurchasingConst.GET_POHE_SUCCESS:
            return { ...state, pohes: action.payload }
        case PurchasingConst.ADD_POHE:
            return { ...state }
        case PurchasingConst.ADD_POHE_SUCCESS:
            return { ...state, pohes: action.payload }
        case PurchasingConst.EDIT_POHE:
            return { ...state }
        case PurchasingConst.EDIT_POHE_SUCCESS:
            state.pohes.splice(state.pohes.findIndex((i: any) => i.poheId == action.payload.poheId), 1)
            return {
                ...state,
                pohe: [...state.pohes]
            }
        case PurchasingConst.DEL_POHE:
            return { ...state }
        case PurchasingConst.DEL_POHE_SUCCESS:
            return {
                ...state,
                pohe: state.pohes.filter((pohes: any) => pohes.id !== +action.payload)
            }
        default:
            return state
    }
}