//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Regions

export const doRegions = () => {
  return {
    type: ActionTypes.GET_REGIONS,
  };
};
export const doRegionsSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_REGIONS_SUCCEED,
    payload,
  };
};
export const doRegionsFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_REGIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Regions

export const doAddRegions = (payload: any) => {
  return {
    type: ActionTypes.ADD_REGIONS,
    payload,
  };
};
export const doAddRegionsSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_REGIONS_SUCCEED,
    payload,
  };
};
export const doAddRegionsFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_REGIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Regions

export const doUpdateRegions = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_REGIONS,
    payload,
  };
};
export const doUpdateRegionsSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_REGIONS_SUCCEED,
    payload,
  };
};
export const doUpdateRegionsFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_REGIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Regions

export const doDelRegions = (payload: any) => {
  return {
    type: ActionTypes.DEL_REGIONS,
    payload,
  };
};
export const doDelRegionsSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_REGIONS_SUCCEED,
    payload,
  };
};
export const doDelRegionsFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_REGIONS_FAILED,
    payload,
  };
};
