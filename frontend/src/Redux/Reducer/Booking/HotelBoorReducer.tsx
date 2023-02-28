import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    hotel: [],
}

function HotelBoorReducer( state = initialState, action: any){
    switch(action.type){
        case BookingConstant.GET_SP_HOTEL:
            return {...state};
        case BookingConstant.GET_SP_HOTEL_SUCCESS:
            return {...state,hotel: action.payload};
        default:
            return {...state};
        
    }
}


export default HotelBoorReducer