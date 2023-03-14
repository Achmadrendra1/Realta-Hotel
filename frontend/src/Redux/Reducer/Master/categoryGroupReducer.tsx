//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  categoryGroup: any[];
}

const initialState: InitialState = {
  categoryGroup: [],
};

// Function categoryGroup Reducer
function categoryGroupReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.GET_CATEGORY_GROUP_SUCCEED:
      return { ...state, categoryGroup: action.payload };
    case ActionTypes.GET_CATEGORY_GROUP_FAILED:
      return { ...state, categoryGroup: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.ADD_CATEGORY_GROUP_SUCCEED:
      return {
        ...state,
        categoryGroup: [...state.categoryGroup, action.payload],
      };
    case ActionTypes.ADD_CATEGORY_GROUP_FAILED:
      return {
        ...state,
        categoryGroup: [...state.categoryGroup, action.payload],
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // UPDATE
    case ActionTypes.UPDATE_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.UPDATE_CATEGORY_GROUP_SUCCEED:
      return {
        ...state,
        categoryGroup: [...state.categoryGroup, action.payload],
      };
    case ActionTypes.UPDATE_CATEGORY_GROUP_FAILED:
      return {
        ...state,
        categoryGroup: [...state.categoryGroup, action.payload],
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.DEL_CATEGORY_GROUP_SUCCEED:
      return {
        ...state,
        categoryGroup: state.categoryGroup.filter(
          (categoryGroup) => categoryGroup.cagroId !== action.payload
        ),
      };
    case ActionTypes.DEL_CATEGORY_GROUP_FAILED:
      return {
        ...state,
        categoryGroup: state.categoryGroup.filter(
          (categoryGroup) => categoryGroup.cagroId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default categoryGroupReducer;
