//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Address

export const doAddress = () => {
  return {
    type: ActionTypes.GET_ADDRESS,
  };
};
export const doAddressSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_ADDRESS_SUCCEED,
    payload,
  };
};
export const doAddressFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_ADDRESS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Address

export const doAddAddress = (payload: any) => {
  return {
    type: ActionTypes.ADD_ADDRESS,
    payload,
  };  
};
export const doAddAddressSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_ADDRESS_SUCCEED,
    payload,
  };
};
export const doAddAddressFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_ADDRESS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Address

export const doUpdateAddress = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS,
    payload,
  };
};
export const doUpdateAddressSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS_SUCCEED,
    payload,
  };
};
export const doUpdateAddressFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Address

export const doDelAddress = (payload: any) => {
  return {
    type: ActionTypes.DEL_ADDRESS,
    payload,
  };
};
export const doDelAddressSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_ADDRESS_SUCCEED,
    payload,
  };
};
export const doDelAddressFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_ADDRESS_FAILED,
    payload,
  };
};
