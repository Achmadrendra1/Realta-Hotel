//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

interface InitialState {
  policyCategoryGroup: any[];
}

const initialState: InitialState = {
  policyCategoryGroup: [],
};

// Function PolicyCategoryGroup Reducer
function policyCategoryGroupReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_POLICY_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.GET_POLICY_CATEGORY_GROUP_SUCCEED:
      return { ...state, policyCategoryGroup: action.payload };
    case ActionTypes.GET_POLICY_CATEGORY_GROUP_FAILED:
      return { ...state, policyCategoryGroup: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_POLICY_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.ADD_POLICY_CATEGORY_GROUP_SUCCEED:
      return { ...state, policyCategoryGroup: [...state.policyCategoryGroup, action.payload] };
    case ActionTypes.ADD_POLICY_CATEGORY_GROUP_FAILED:
      return { ...state, policyCategoryGroup: [...state.policyCategoryGroup, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_POLICY_CATEGORY_GROUP:
      return { ...state };
    case ActionTypes.DEL_POLICY_CATEGORY_GROUP_SUCCEED:
      return {
        ...state,
        policyCategoryGroup: state.policyCategoryGroup.filter(
          (policyCategoryGroup) => policyCategoryGroup.addrId !== action.payload
        ),
      };
    case ActionTypes.DEL_POLICY_CATEGORY_GROUP_FAILED:
      return {
        ...state,
        policyCategoryGroup: state.policyCategoryGroup.filter(
          (policyCategoryGroup) => policyCategoryGroup.addrId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default policyCategoryGroupReducer;
