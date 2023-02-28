//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table PolicyCategoryGroup

export const doPolicyCategoryGroup = () => {
  return {
    type: ActionTypes.GET_POLICY_CATEGORY_GROUP,
  };
};
export const doPolicyCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_POLICY_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doPolicyCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_POLICY_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table PolicyCategoryGroup

export const doAddPolicyCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY_CATEGORY_GROUP,
    payload,
  };
};
export const doAddPolicyCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doAddPolicyCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table PolicyCategoryGroup

export const doUpdatePolicyCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY_CATEGORY_GROUP,
    payload,
  };
};
export const doUpdatePolicyCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doUpdatePolicyCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table PolicyCategoryGroup

export const doDelPolicyCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY_CATEGORY_GROUP,
    payload,
  };
};
export const doDelPolicyCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doDelPolicyCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY_CATEGORY_GROUP_FAILED,
    payload,
  };
};
