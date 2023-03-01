import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    vepros: [],
    vepro: []
}

export default function VeproReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_VEPRO:
            return { ...state }
        case PurchasingConst.GETONE_VEPRO_SUCCESS:
            return { ...state, vepros: action.payload }
        case PurchasingConst.GET_VEPRO:
            return { ...state }
        case PurchasingConst.GET_VEPRO_SUCCESS:
            return { ...state, vepros: action.payload }
        case PurchasingConst.ADD_VEPRO:
            return { ...state }
        case PurchasingConst.ADD_VEPRO_SUCCESS:
            return { ...state, vepros: [...state.vepros, action.payload] }
        case PurchasingConst.EDIT_VEPRO:
            return { ...state }
        case PurchasingConst.EDIT_VEPRO_SUCCESS:
            return EditVepro(state, action)
        case PurchasingConst.DEL_VEPRO:
            return { ...state }
        case PurchasingConst.DEL_VEPRO_SUCCESS:
            return {
                ...state,
                vepro: state.vepros.filter(
                    (vepros: any) => vepros.id !== action.payload)
            }
        default:
            return { ...state }
    }
}

const EditVepro = (state: any, action: any) => {
    return state.vepros.map((vepros: any) => {
        if (vepros.id === action.payload.id) {
            return {
                ...state,
                ...action.payload
            }
        } else {
            return state
        }
    })
}