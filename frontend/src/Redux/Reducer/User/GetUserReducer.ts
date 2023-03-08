import UserConst from "../../Constant/User/UserConst";

const initialState = {
  getUser: [],
  error : null
};

export default function GetUserReducer(state = initialState, action:any) {
  switch (action.type) {
    case UserConst.GET_DATA_USER:
      return { ...state };
    case UserConst.DATA_USER_SUCCESS:
      return { ...state, getUser: action.payload };
      case UserConst.ADD_DATA_USER:
        return {...state}
    case UserConst.ADD_DATA_USER_SUCCESS:
        return {...state, getUser: action.payload}
    case UserConst.ADD_DATA_USER_FAILED:
        return {...state, error: action.payload}
    case UserConst.EDIT_DATA_PROFILE:
      return {...state };
    case UserConst.EDIT_DATA_PROFILE_SUCCESS:
      state.getUser.splice(
        state.getUser.findIndex(
          (i: any) => i.user_id == action.payload.user_id
        ),
        1,
        action.payload
      );
      return {
        ...state,
        getUser: [...state.getUser],
      };
    case UserConst.EDIT_DATA_PROFILE_FAILED:
      return {...state,error : action.payload};
    case UserConst.UPDATE_PASSWORD:
      return{...state}
    case UserConst.UPDATE_PASSWORD_SUCCESS:
        state.getUser.splice(
        state.getUser.findIndex(
          (i: any) => i.uspa_user_id == action.payload.uspa_user_id
        ),
        action.payload
      );
      return {
        ...state,
        getUser: [...state.getUser],
      };
    case UserConst.UPDATE_PASSWORD_FAILED:
      return {...state,error : action.payload};
    default:
      return {...state};

  }
}


