import BookingConstant from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    spof : []
}

function SpofReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.GET_SPOF:
            return {...state};
        case BookingConstant.GET_SPOF_SUCCESS:
            return {...state,spof : action.payload};
        default:
            return {...state};
    }
}

export default SpofReducer