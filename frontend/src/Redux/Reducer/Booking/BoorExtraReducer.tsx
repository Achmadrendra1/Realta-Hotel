import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    extra : []
}

function BoorExtraReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.INSERT_BOOKING_EXTRA:
            return {...state};
        case BookingConstant.INSERT_BOOKING_EXTRA_SUCCESS:
            return {...state, extra : action.payload}
        default :
            return {...state}
    }
}

export default BoorExtraReducer