//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Locations

export const doLocations = () => {
  return {
    type: ActionTypes.GET_LOCATIONS,
  };
};
export const doLocationsSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONS_SUCCEED,
    payload,
  };
};
export const doLocationsFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_LOCATIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Locations

export const doAddLocations = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONS,
    payload,
  };
};
export const doAddLocationsSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONS_SUCCEED,
    payload,
  };
};
export const doAddLocationsFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_LOCATIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Locations

export const doUpdateLocations = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONS,
    payload,
  };
};
export const doUpdateLocationsSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONS_SUCCEED,
    payload,
  };
};
export const doUpdateLocationsFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_LOCATIONS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Locations

export const doDelLocations = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONS,
    payload,
  };
};
export const doDelLocationsSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONS_SUCCEED,
    payload,
  };
};
export const doDelLocationsFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_LOCATIONS_FAILED,
    payload,
  };
};
