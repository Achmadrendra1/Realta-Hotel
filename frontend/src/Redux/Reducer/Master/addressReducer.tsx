//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  address: any[];
}

const initialState: InitialState = {
  address: [],
};

// Function Address Reducer
function addressReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_ADDRESS:
      return { ...state };
    case ActionTypes.GET_ADDRESS_SUCCEED:
      return { ...state, address: action.payload };
    case ActionTypes.GET_ADDRESS_FAILED:
      return { ...state, error: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_ADDRESS:
      return { ...state };
    case ActionTypes.ADD_ADDRESS_SUCCEED:
      return { ...state, address: [...state.address, action.payload] };
    case ActionTypes.ADD_ADDRESS_FAILED:
      return { ...state, address: [...state.address, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_ADDRESS:
      return { ...state };
    case ActionTypes.UPDATE_ADDRESS_SUCCEED:
      return { ...state, address: [...state.address, action.payload] };
    case ActionTypes.UPDATE_ADDRESS_FAILED:
      return { ...state, address: [...state.address, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_ADDRESS:
      return { ...state };
    case ActionTypes.DEL_ADDRESS_SUCCEED:
      return {
        ...state,
        address: state.address.filter(
          (address) => address.addrId !== action.payload
        ),
      };
    case ActionTypes.DEL_ADDRESS_FAILED:
      return {
        ...state,
        address: state.address.filter(
          (address) => address.addrId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default addressReducer;
