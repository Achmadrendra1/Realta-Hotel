import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

export const getSpof = () => {
    return {
        type : BookingConstant.GET_SPOF
    }
}

export const getSpofSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_SPOF_SUCCESS,
        payload
    }
}

export const getSpofFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_SPOF_FAILED,
        payload
    }
}

export const getBoor = () => {
    return {
        type : BookingConstant.GET_BOOR
    }
}

export const getBoorSuccess = (payload : any) => {
    return{
        type : BookingConstant.GET_BOOR_SUCCESS,
        payload
    }
}

export const getBoorFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_BOOR_FAILED,
        payload
    }
}

export const getBorde = () => {
    return {
        type : BookingConstant.GET_BORDE
    }
}

export const getBordeSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_BORDE_SUCCESS,
        payload
    }
}

export const getBordeFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_BORDE_FAILED,
        payload
    }
}

export const insertBooking = (payload : any) => {
    return {
        type : BookingConstant.INSERT_BOOKING_ORDER,
        payload
    }
}

export const insertBookingSuccess = (payload : any) => {
    return {
        type : BookingConstant.INSERT_BOOKING_ORDER_SUCCESS,
        payload
    }
}

export const insertBookingFailed = (payload : any) => {
    return {
        type : BookingConstant.INSERT_BOOKING_ORDER_FAILED,
        payload
    }
}

export const insertBookingExtra = (payload : any) => {
    return{
        type : BookingConstant.INSERT_BOOKING_EXTRA,
        payload
    }
}

export const insertBookingExtraSuccess = (payload : any) => {
    return {
        type : BookingConstant.INSERT_BOOKING_EXTRA_SUCCESS,
        payload
    }
}

export const insertBookingExtraFailed = (payload : any) => {
    return {
        type : BookingConstant.INSERT_BOOKING_ORDER_FAILED,
        payload
    }
}

export const getSpHotel = () => {
    return{
        type : BookingConstant.GET_SP_HOTEL
    }
}

export const getSpHotelSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_HOTEL_SUCCESS,
        payload
    }
}

export const getSpHotelFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_HOTEL_FAILED,
        payload
    }
}

export const getSpFacilities = () => {
    return {
        type : BookingConstant.GET_SP_FACILITIES
    }
}

export const getSpFacilitiesSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_FACILITIES_SUCCESS,
        payload
    }
}

export const getSpFacilitiesFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_FACILITIES_FAILED,
        payload
    }
}

export const getSpReview = () => {
    return {
        type : BookingConstant.GET_SP_REVIEW
    }
}

export const getSpReviewSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_REVIEW_SUCCESS,
        payload
    }
}

export const getSpReviewFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_REVIEW_FAILED,
        payload
    }
}

export const getSpInvoice = () => {
    return {
        type : BookingConstant.GET_SP_INVOICE
    }
}

export const getSpInvoiceSuccess = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_INVOICE_SUCCESS,
        payload
    }
}

export const getSpInvoiceFailed = (payload : any) => {
    return {
        type : BookingConstant.GET_SP_INVOICE_FAILED,
        payload
    }
}
