//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  locationsRCP: any[];
}

const initialState: InitialState = {
  locationsRCP: [],
};

// Function locationsRCP Reducer
function locationsRCPReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_LOCATIONSRCP:
      return { ...state };
    case ActionTypes.GET_LOCATIONSRCP_SUCCEED:
      return { ...state, locationsRCP: action.payload };
    case ActionTypes.GET_LOCATIONSRCP_FAILED:
      return { ...state, locationsRCP: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_LOCATIONSRCP:
      return { ...state };
    case ActionTypes.ADD_LOCATIONSRCP_SUCCEED:
      return { ...state, locationsRCP: [...state.locationsRCP, action.payload] };
    case ActionTypes.ADD_LOCATIONSRCP_FAILED:
      return { ...state, locationsRCP: [...state.locationsRCP, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_LOCATIONSRCP:
      return { ...state };
    case ActionTypes.UPDATE_LOCATIONSRCP_SUCCEED:
      return { ...state, locationsRCP: [...state.locationsRCP, action.payload] };
    case ActionTypes.UPDATE_LOCATIONSRCP_FAILED:
      return { ...state, locationsRCP: [...state.locationsRCP, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_LOCATIONSRCP:
      return { ...state };
    case ActionTypes.DEL_LOCATIONSRCP_SUCCEED:
      return {
        ...state,
        locationsRCP: state.locationsRCP.filter(
          (locationsRCP) => locationsRCP.region_code !== action.payload
        ),
      };
    case ActionTypes.DEL_LOCATIONSRCP_FAILED:
      return {
        ...state,
        locationsRCP: state.locationsRCP.filter(
          (locationsRCP) => locationsRCP.region_code !== action.payload
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default locationsRCPReducer;
