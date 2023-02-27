//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Country

export const doCountry = () => {
  return {
    type: ActionTypes.GET_COUNTRY,
  };
};
export const doCountrySucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_COUNTRY_SUCCEED,
    payload,
  };
};
export const doCountryFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_COUNTRY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Country

export const doAddCountry = (payload: any) => {
  return {
    type: ActionTypes.ADD_COUNTRY,
    payload,
  };
};
export const doAddCountrySucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_COUNTRY_SUCCEED,
    payload,
  };
};
export const doAddCountryFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_COUNTRY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Country

export const doUpdateCountry = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_COUNTRY,
    payload,
  };
};
export const doUpdateCountrySucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_COUNTRY_SUCCEED,
    payload,
  };
};
export const doUpdateCountryFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_COUNTRY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Country

export const doDelCountry = (payload: any) => {
  return {
    type: ActionTypes.DEL_COUNTRY,
    payload,
  };
};
export const doDelCountrySucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_COUNTRY_SUCCEED,
    payload,
  };
};
export const doDelCountryFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_COUNTRY_FAILED,
    payload,
  };
};
