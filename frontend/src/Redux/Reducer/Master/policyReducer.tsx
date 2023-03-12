//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  policy: any[];
}

const initialState: InitialState = {
  policy: [],
};

// Function Policy Reducer
function policyReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_POLICY:
      return { ...state };
    case ActionTypes.GET_POLICY_SUCCEED:
      return { ...state, policy: action.payload };
    case ActionTypes.GET_POLICY_FAILED:
      return { ...state, policy: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_POLICY:
      return { ...state };
    case ActionTypes.ADD_POLICY_SUCCEED:
      return { ...state, policy: [...state.policy, action.payload] };
    case ActionTypes.ADD_POLICY_FAILED:
      return { ...state, policy: [...state.policy, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_POLICY:
      return { ...state };
    case ActionTypes.UPDATE_POLICY_SUCCEED:
      return { ...state, policy: [...state.policy, action.payload] };
    case ActionTypes.UPDATE_POLICY_FAILED:
      return { ...state, policy: [...state.policy, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_POLICY:
      return { ...state };
    case ActionTypes.DEL_POLICY_SUCCEED:
      return {
        ...state,
        policy: state.policy.filter(
          (policy) => policy.poliId !== action.payload
        ),
      };
    case ActionTypes.DEL_POLICY_FAILED:
      return {
        ...state,
        policy: state.policy.filter(
          (policy) => policy.poliId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default policyReducer;
