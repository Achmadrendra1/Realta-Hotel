//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  country: any[];
}

const initialState: InitialState = {
  country: [],
};

// Function Country Reducer
function countryReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_COUNTRY:
      return { ...state };
    case ActionTypes.GET_COUNTRY_SUCCEED:
      return { ...state, country: action.payload };
    case ActionTypes.GET_COUNTRY_FAILED:
      return { ...state, country: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_COUNTRY:
      return { ...state };
    case ActionTypes.ADD_COUNTRY_SUCCEED:
      return { ...state, country: [...state.country, action.payload] };
    case ActionTypes.ADD_COUNTRY_FAILED:
      return { ...state, country: [...state.country, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_COUNTRY:
      return { ...state };
    case ActionTypes.UPDATE_COUNTRY_SUCCEED:
      return { ...state, country: [...state.country, action.payload] };
    case ActionTypes.UPDATE_COUNTRY_FAILED:
      return { ...state, country: [...state.country, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_COUNTRY:
      return { ...state };
    case ActionTypes.DEL_COUNTRY_SUCCEED:
      return {
        ...state,
        country: state.country.filter(
          (country) => country.country_id !== action.payload
        ),
      };
    case ActionTypes.DEL_COUNTRY_FAILED:
      return {
        ...state,
        country: state.country.filter(
          (country) => country.country_id !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default countryReducer;
