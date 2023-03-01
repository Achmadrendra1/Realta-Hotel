import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    podes: [],
    pode: []
}

export default function PodeReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_PODE:
            return { ...state }
        case PurchasingConst.GETONE_PODE_SUCCESS:
            return { ...state, podes: action.payload }
        case PurchasingConst.GET_PODE:
            return { ...state }
        case PurchasingConst.GET_PODE_SUCCESS:
            return { ...state, podes: action.payload }
        case PurchasingConst.ADD_PODE:
            return { ...state }
        case PurchasingConst.ADD_PODE_SUCCESS:
            return { ...state, podes: action.payload }
        case PurchasingConst.EDIT_PODE:
            return { ...state }
        case PurchasingConst.EDIT_PODE_SUCCESS:
            state.podes.splice(state.podes.findIndex((i: any) => i.podeId == action.payload.podeId), 1)
            return {
                ...state,
                pode: [...state.podes]
            }
        case PurchasingConst.DEL_PODE:
            return { ...state }
        case PurchasingConst.DEL_PODE_SUCCESS:
            return {
                ...state,
                pode: state.podes.filter((podes: any) => podes.id !== +action.payload)
            }
        default:
            return state
    }
}