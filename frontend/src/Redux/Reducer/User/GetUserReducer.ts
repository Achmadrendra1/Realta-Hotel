import UserConst from "../../Constant/User/UserConst";

const initialState = {
  getUser: [],
  error : null
};

export default function GetUserReducer(state = initialState, action: any) {
  switch (action.type) {
    case UserConst.GET_DATA_USER:
      return { ...state };
    case UserConst.DATA_USER_SUCCESS:
      return { ...state, getUser: action.payload };
    default:
      return {...state};
  }
}
