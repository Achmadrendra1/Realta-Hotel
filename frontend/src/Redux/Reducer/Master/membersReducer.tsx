//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  members: any[];
}

const initialState: InitialState = {
  members: [],
};

// Function Members Reducer
function membersReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_MEMBERS:
      return { ...state };
    case ActionTypes.GET_MEMBERS_SUCCEED:
      return { ...state, members: action.payload };
    case ActionTypes.GET_MEMBERS_FAILED:
      return { ...state, members: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_MEMBERS:
      return { ...state };
    case ActionTypes.ADD_MEMBERS_SUCCEED:
      return { ...state, members: [...state.members, action.payload] };
    case ActionTypes.ADD_MEMBERS_FAILED:
      return { ...state, members: [...state.members, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_MEMBERS:
      return { ...state };
    case ActionTypes.UPDATE_MEMBERS_SUCCEED:
      return { ...state, members: [...state.members, action.payload] };
    case ActionTypes.UPDATE_MEMBERS_FAILED:
      return { ...state, members: [...state.members, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_MEMBERS:
      return { ...state };
    case ActionTypes.DEL_MEMBERS_SUCCEED:
      return {
        ...state,
        members: state.members.filter(
          (members) => members.membName !== action.payload
        ),
      };
    case ActionTypes.DEL_MEMBERS_FAILED:
      return {
        ...state,
        members: state.members.filter(
          (members) => members.membName !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default membersReducer;
