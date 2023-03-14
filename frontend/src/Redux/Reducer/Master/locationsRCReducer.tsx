//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  locationsRC: any[];
}

const initialState: InitialState = {
  locationsRC: [],
};

// Function locationsRC Reducer
function locationsRCReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_LOCATIONSRC:
      return { ...state };
    case ActionTypes.GET_LOCATIONSRC_SUCCEED:
      return { ...state, locationsRC: action.payload };
    case ActionTypes.GET_LOCATIONSRC_FAILED:
      return { ...state, locationsRC: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_LOCATIONSRC:
      return { ...state };
    case ActionTypes.ADD_LOCATIONSRC_SUCCEED:
      return { ...state, locationsRC: [...state.locationsRC, action.payload] };
    case ActionTypes.ADD_LOCATIONSRC_FAILED:
      return { ...state, locationsRC: [...state.locationsRC, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_LOCATIONSRC:
      return { ...state };
    case ActionTypes.UPDATE_LOCATIONSRC_SUCCEED:
      return { ...state, locationsRC: [...state.locationsRC, action.payload] };
    case ActionTypes.UPDATE_LOCATIONSRC_FAILED:
      return { ...state, locationsRC: [...state.locationsRC, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_LOCATIONSRC:
      return { ...state };
    case ActionTypes.DEL_LOCATIONSRC_SUCCEED:
      return {
        ...state,
        locationsRC: state.locationsRC.filter(
          (locationsRC) => locationsRC.region_code !== action.payload
        ),
      };
    case ActionTypes.DEL_LOCATIONSRC_FAILED:
      return {
        ...state,
        locationsRC: state.locationsRC.filter(
          (locationsRC) => locationsRC.region_code !== action.payload
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default locationsRCReducer;
