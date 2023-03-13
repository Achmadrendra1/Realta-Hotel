//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  regions: any[];
}

const initialState: InitialState = {
  regions: [],
};

// Function Regions Reducer
function regionsReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_REGIONS:
      return { ...state };
    case ActionTypes.GET_REGIONS_SUCCEED:
      return { ...state, regions: action.payload };
    case ActionTypes.GET_REGIONS_FAILED:
      return { ...state, regions: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_REGIONS:
      return { ...state };
    case ActionTypes.ADD_REGIONS_SUCCEED:
      return { ...state, regions: [...state.regions, action.payload] };
    case ActionTypes.ADD_REGIONS_FAILED:
      return { ...state, regions: [...state.regions, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Update
    case ActionTypes.UPDATE_REGIONS:
      return { ...state };
    case ActionTypes.UPDATE_REGIONS_SUCCEED:
      return { ...state, regions: [...state.regions, action.payload] };
    case ActionTypes.UPDATE_REGIONS_FAILED:
      return { ...state, regions: [...state.regions, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_REGIONS:
      return { ...state };
    case ActionTypes.DEL_REGIONS_SUCCEED:
      return {
        ...state,
        regions: state.regions.filter(
          (regions) => regions.region_code !== action.payload
        ),
      };
    case ActionTypes.DEL_REGIONS_FAILED:
      return {
        ...state,
        regions: state.regions.filter(
          (regions) => regions.region_code !== action.payload
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default regionsReducer;
