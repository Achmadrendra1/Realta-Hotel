import userMenuConstant from "@/Redux/Constant/Resto/userMenuConstant";

const initialState = {
    userMenu : []
}

export default function userMenuReducer(state=initialState, action:any){
    switch(action.type){
        case userMenuConstant.GET_MENU_USER: 
            return {...state};
        case userMenuConstant.GET_MENU_USER_SUCCEED:
            return {...state, userMenu: action.payload};
        default:
            return state;
    }
}