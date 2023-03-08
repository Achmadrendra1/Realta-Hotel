import UserConst from "../../Constant/User/UserConst";

const initialState = {
  IsAuth: null,
  error: null,
};

export default function loginReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case UserConst.LOGIN_USER:
      return { ...state };
    case UserConst.LOGIN_USER_SUCCESS:
      return { ...state, IsAuth: payload };
    case UserConst.LOGIN_USER_FAILED:
      return { ...state, error: payload };
    case UserConst.LOGOUT_USER:
      localStorage.clear();
      return { IsAuth: null, error: null };
    
    default:
      return state;
  }
}
