import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    invoice : []
}

function BoorInvoiceReducer (state = initialState, action : any) {
    switch (action.type){
        case BookingConstant.GET_SP_INVOICE:
            return {...state};
        case BookingConstant.GET_SP_INVOICE_SUCCESS:
            return {...state, invoice : action.payload}
        default :
            return {...state}
    }
}

export default BoorInvoiceReducer