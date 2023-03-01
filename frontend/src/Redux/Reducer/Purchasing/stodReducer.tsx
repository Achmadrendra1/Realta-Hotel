import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    stods: [],
    stod: []
}

export default function StodReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_STOD:
            return { ...state }
        case PurchasingConst.GETONE_STOD_SUCCESS:
            return { ...state, stods: action.payload }
        case PurchasingConst.GET_STOD:
            return { ...state }
        case PurchasingConst.GET_STOD_SUCCESS:
            return { ...state, stods: action.payload }
        case PurchasingConst.ADD_STOD:
            return { ...state }
        case PurchasingConst.ADD_STOD_SUCCESS:
            return { ...state, stods: action.payload }
        case PurchasingConst.EDIT_STOD:
            return { ...state }
        case PurchasingConst.EDIT_STOD_SUCCESS:
            state.stods.splice(state.stods.findIndex((i: any) => i.stodId == action.payload.stodId), 1)
            return {
                ...state,
                stod: [...state.stods]
            }
        case PurchasingConst.DEL_STOD:
            return { ...state }
        case PurchasingConst.DEL_STOD_SUCCESS:
            return {
                ...state,
                stod: state.stods.filter((stods: any) => stods.id !== +action.payload)
            }
        default:
            return state
    }
}