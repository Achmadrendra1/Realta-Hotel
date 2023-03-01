//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table LocationsRCP

export const doLocationsRCP = () => {
  return {
    type: ActionTypes.GET_LOCATIONSRCP,
  };
};
export const doLocationsRCPSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONSRCP_SUCCEED,
    payload,
  };
};
export const doLocationsRCPFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONSRCP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table LocationsRCP

export const doAddLocationsRCP = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRCP,
    payload,
  };
};
export const doAddLocationsRCPSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRCP_SUCCEED,
    payload,
  };
};
export const doAddLocationsRCPFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONSRCP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table LocationsRCP

export const doUpdateLocationsRCP = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRCP,
    payload,
  };
};
export const doUpdateLocationsRCPSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRCP_SUCCEED,
    payload,
  };
};
export const doUpdateLocationsRCPFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONSRCP_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table LocationsRCP

export const doDelLocationsRCP = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRCP,
    payload,
  };
};
export const doDelLocationsRCPSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRCP_SUCCEED,
    payload,
  };
};
export const doDelLocationsRCPFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONSRCP_FAILED,
    payload,
  };
};
