import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    facilities: []
}

function FaciBoorReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.GET_SP_FACILITIES:
            return {...state};
        case BookingConstant.GET_SP_FACILITIES_SUCCESS:
            return {...state,facilities: action.payload};
        default:
            return {...state};
    }
}

export default FaciBoorReducer