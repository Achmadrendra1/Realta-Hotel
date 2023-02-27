//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Provinces

export const doProvinces = () => {
  return {
    type: ActionTypes.GET_PROVINCES,
  };
};
export const doProvincesSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_PROVINCES_SUCCEED,
    payload,
  };
};
export const doProvincesFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_PROVINCES_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Provinces

export const doAddProvinces = (payload: any) => {
  return {
    type: ActionTypes.ADD_PROVINCES,
    payload,
  };
};
export const doAddProvincesSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_PROVINCES_SUCCEED,
    payload,
  };
};
export const doAddProvincesFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_PROVINCES_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Provinces

export const doUpdateProvinces = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PROVINCES,
    payload,
  };
};
export const doUpdateProvincesSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PROVINCES_SUCCEED,
    payload,
  };
};
export const doUpdateProvincesFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PROVINCES_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Provinces

export const doDelProvinces = (payload: any) => {
  return {
    type: ActionTypes.DEL_PROVINCES,
    payload,
  };
};
export const doDelProvincesSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_PROVINCES_SUCCEED,
    payload,
  };
};
export const doDelProvincesFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_PROVINCES_FAILED,
    payload,
  };
};
