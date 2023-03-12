//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  locations: any[];
}

const initialState: InitialState = {
  locations: [],
};

// Function Locations Reducer
function locationsReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_LOCATIONS:
      return { ...state };
    case ActionTypes.GET_LOCATIONS_SUCCEED:
      return { ...state, locations: action.payload };
    case ActionTypes.GET_LOCATIONS_FAILED:
      return { ...state, locations: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_LOCATIONS:
      return { ...state };
    case ActionTypes.ADD_LOCATIONS_SUCCEED:
      return { ...state, locations: [...state.locations, action.payload] };
    case ActionTypes.ADD_LOCATIONS_FAILED:
      return { ...state, locations: [...state.locations, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_LOCATIONS:
      return { ...state };
    case ActionTypes.UPDATE_LOCATIONS_SUCCEED:
      return { ...state, locations: [...state.locations, action.payload] };
    case ActionTypes.UPDATE_LOCATIONS_FAILED:
      return { ...state, locations: [...state.locations, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_LOCATIONS:
      return { ...state };
    case ActionTypes.DEL_LOCATIONS_SUCCEED:
      return {
        ...state,
        locations: state.locations.filter(
          (locations) => locations.region_code !== action.payload
        ),
      };
    case ActionTypes.DEL_LOCATIONS_FAILED:
      return {
        ...state,
        locations: state.locations.filter(
          (locations) => locations.region_code !== action.payload
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default locationsReducer;
