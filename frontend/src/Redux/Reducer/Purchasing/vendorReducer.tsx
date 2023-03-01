import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    vendors: [],
    vendor: []
}

export default function VendorReducer(state = initialState, action: any) {
    switch (action.type) {
        case PurchasingConst.GETONE_VENDOR:
            return { ...state }
        case PurchasingConst.GETONE_VENDOR_SUCCESS:
            return { ...state, vendors: action.payload }
        case PurchasingConst.GET_VENDOR:
            return { ...state }
        case PurchasingConst.GET_VENDOR_SUCCESS:
            return { ...state, vendors: action.payload }
        case PurchasingConst.ADD_VENDOR:
            return { ...state }
        case PurchasingConst.ADD_VENDOR_SUCCESS:
            return { ...state, vendors: action.payload }
        case PurchasingConst.EDIT_VENDOR:
            return { ...state }
        case PurchasingConst.EDIT_VENDOR_SUCCESS:
            state.vendors.splice(state.vendors.findIndex((i: any) => i.vendorId == action.payload.vendorId), 1)
            return {
                ...state,
                vendor: [...state.vendors]
            }
        case PurchasingConst.DEL_VENDOR:
            return { ...state }
        case PurchasingConst.DEL_VENDOR_SUCCESS:
            return {
                ...state,
                vendor: state.vendors.filter((vendors: any) => vendors.id !== +action.payload)
            }
        default:
            return state
    }
}