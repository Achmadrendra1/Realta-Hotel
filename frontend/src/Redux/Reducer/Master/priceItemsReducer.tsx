//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  priceItems: any[];
}

const initialState: InitialState = {
  priceItems: [],
};

// Function PriceItems Reducer
function priceItemsReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_PRICE_ITEMS:
      return { ...state };
    case ActionTypes.GET_PRICE_ITEMS_SUCCEED:
      return { ...state, priceItems: action.payload };
    case ActionTypes.GET_PRICE_ITEMS_FAILED:
      return { ...state, priceItems: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_PRICE_ITEMS:
      return { ...state };
    case ActionTypes.ADD_PRICE_ITEMS_SUCCEED:
      return { ...state, priceItems: [...state.priceItems, action.payload] };
    case ActionTypes.ADD_PRICE_ITEMS_FAILED:
      return { ...state, priceItems: [...state.priceItems, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_PRICE_ITEMS:
      return { ...state };
    case ActionTypes.UPDATE_PRICE_ITEMS_SUCCEED:
      return { ...state, priceItems: [...state.priceItems, action.payload] };
    case ActionTypes.UPDATE_PRICE_ITEMS_FAILED:
      return { ...state, priceItems: [...state.priceItems, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_PRICE_ITEMS:
      return { ...state };
    case ActionTypes.DEL_PRICE_ITEMS_SUCCEED:
      return {
        ...state,
        priceItems: state.priceItems.filter(
          (priceItems) => priceItems.pritId !== action.payload
        ),
      };
    case ActionTypes.DEL_PRICE_ITEMS_FAILED:
      return {
        ...state,
        priceItems: state.priceItems.filter(
          (priceItems) => priceItems.pritId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default priceItemsReducer;
