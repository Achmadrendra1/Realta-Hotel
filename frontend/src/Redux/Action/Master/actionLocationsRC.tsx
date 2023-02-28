//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table LocationsRC

export const doLocationsRC = () => {
  return {
    type: ActionTypes.GET_LOCATIONSRC,
  };
};
export const doLocationsRCSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONSRC_SUCCEED,
    payload,
  };
};
export const doLocationsRCFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONSRC_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table LocationsRC

export const doAddLocationsRC = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRC,
    payload,
  };
};
export const doAddLocationsRCSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRC_SUCCEED,
    payload,
  };
};
export const doAddLocationsRCFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRC_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table LocationsRC

export const doUpdateLocationsRC = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRC,
    payload,
  };
};
export const doUpdateLocationsRCSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRC_SUCCEED,
    payload,
  };
};
export const doUpdateLocationsRCFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRC_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table LocationsRC

export const doDelLocationsRC = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRC,
    payload,
  };
};
export const doDelLocationsRCSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRC_SUCCEED,
    payload,
  };
};
export const doDelLocationsRCFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRC_FAILED,
    payload,
  };
};
