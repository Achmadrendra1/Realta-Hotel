import BookingConstant  from "@/Redux/Constant/Booking/BookingConstant";

const initialState = {
    borde : []
}

function BoorDetailReducer(state = initialState, action : any){
    switch(action.type){
        case BookingConstant.GET_BORDE:
            return {...state}
        case BookingConstant.GET_BORDE_SUCCESS:
            return {...state, borde : action.payload}
        default :
            return {...state}
    }
}

export default BoorDetailReducer