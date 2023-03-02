import constant from "@/Redux/Constant/Resto/constant";


const initialState = {
    menu: []
}

export default function menuReducer( state = initialState, action:any) {
  switch(action.type){
    case constant.GET_MENU_DETAIL:
        return {...state};
    
    default:
        return {...state, menu: action.payload}
  }
}
