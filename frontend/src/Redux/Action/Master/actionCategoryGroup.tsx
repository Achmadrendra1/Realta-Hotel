//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table CategoryGroup

export const doCategoryGroup = () => {
  return {
    type: ActionTypes.GET_CATEGORY_GROUP,
  };
};
export const doCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table CategoryGroup

export const doAddCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.ADD_CATEGORY_GROUP,
    payload,
  };
};
export const doAddCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doAddCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table CategoryGroup

export const doUpdateCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY_GROUP,
    payload,
    
  };
};
export const doUpdateCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doUpdateCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY_GROUP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table CategoryGroup

export const doDelCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.DEL_CATEGORY_GROUP,
    payload,
  };
};
export const doDelCategoryGroupSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_CATEGORY_GROUP_SUCCEED,
    payload,
  };
};
export const doDelCategoryGroupFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_CATEGORY_GROUP_FAILED,
    payload,
  };
};
