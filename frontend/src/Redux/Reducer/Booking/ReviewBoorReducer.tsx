import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    review: [],
}

function ReviewBoorReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.GET_SP_REVIEW:
            return {...state};
        case BookingConstant.GET_SP_REVIEW_SUCCESS:
            return {...state,review: action.payload};
        default:
            return {...state};
    }
}

export default ReviewBoorReducer