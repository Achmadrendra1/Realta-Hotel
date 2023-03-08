import PurchasingConst from "@/Redux/Constant/Purchasing/PurchasingConst";

const initialState = {
    vendors: []
}

export const VendorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PurchasingConst.GET_VENDOR:
        case PurchasingConst.ADD_VENDOR:
        case PurchasingConst.EDIT_VENDOR:
        case PurchasingConst.DEL_VENDOR:
            return { ...state }

        case PurchasingConst.GET_VENDOR_SUCCESS:
        case PurchasingConst.ADD_VENDOR_SUCCESS:
            return { ...state, vendors: action.payload }

        case PurchasingConst.EDIT_VENDOR_SUCCESS:
            const index = state.vendors.findIndex((item: any) => item.vendorId == action.payload.vendorId)
            state.vendors.splice(index, 1, action.payload)
            return {
                ...state,
                vendors: [...state.vendors]
            }

        case PurchasingConst.DEL_VENDOR_SUCCESS:
            return {
                ...state,
                vendors: state.vendors.filter((item: any) => item.vendorId !== action.payload)
            }

        default:
            return state
    }
}