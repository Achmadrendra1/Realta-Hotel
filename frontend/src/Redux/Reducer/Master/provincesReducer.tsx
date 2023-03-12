//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  provinces: any[];
}

const initialState: InitialState = {
  provinces: [],
};

// Function Provinces Reducer
function provincesReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_PROVINCES:
      return { ...state };
    case ActionTypes.GET_PROVINCES_SUCCEED:
      return { ...state, provinces: action.payload };
    case ActionTypes.GET_PROVINCES_FAILED:
      return { ...state, provinces: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_PROVINCES:
      return { ...state };
    case ActionTypes.ADD_PROVINCES_SUCCEED:
      return { ...state, provinces: [...state.provinces, action.payload] };
    case ActionTypes.ADD_PROVINCES_FAILED:
      return { ...state, provinces: [...state.provinces, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_PROVINCES:
      return { ...state };
    case ActionTypes.UPDATE_PROVINCES_SUCCEED:
      return { ...state, provinces: [...state.provinces, action.payload] };
    case ActionTypes.UPDATE_PROVINCES_FAILED:
      return { ...state, provinces: [...state.provinces, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_PROVINCES:
      return { ...state };
    case ActionTypes.DEL_PROVINCES_SUCCEED:
      return {
        ...state,
        provinces: state.provinces.filter(
          (provinces) => provinces.prov_id !== action.payload
        ),
      };
    case ActionTypes.DEL_PROVINCES_FAILED:
      return {
        ...state,
        provinces: state.provinces.filter(
          (provinces) => provinces.prov_id !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default provincesReducer;
