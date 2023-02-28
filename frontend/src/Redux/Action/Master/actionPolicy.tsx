//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Policy

export const doPolicy = () => {
  return {
    type: ActionTypes.GET_POLICY,
  };
};
export const doPolicySucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_POLICY_SUCCEED,
    payload,
  };
};
export const doPolicyFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_POLICY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Policy

export const doAddPolicy = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY,
    payload,
  };
};
export const doAddPolicySucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY_SUCCEED,
    payload,
  };
};
export const doAddPolicyFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_POLICY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Policy

export const doUpdatePolicy = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY,
    payload,
  };
};
export const doUpdatePolicySucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY_SUCCEED,
    payload,
  };
};
export const doUpdatePolicyFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_POLICY_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Policy

export const doDelPolicy = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY,
    payload,
  };
};
export const doDelPolicySucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY_SUCCEED,
    payload,
  };
};
export const doDelPolicyFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_POLICY_FAILED,
    payload,
  };
};
