import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    boor : []
}

function BoorReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.GET_BOOR:
            return {...state};
        case BookingConstant.GET_BOOR_SUCCESS:
            return {...state,boor : action.payload};
        case BookingConstant.INSERT_BOOKING_ORDER:
            return {...state};
        case BookingConstant.INSERT_BOOKING_ORDER_SUCCESS:
            return {...state,boor : action.payload}
        default :
            return {...state}
    }
}

export default BoorReducer