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
