//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table ServiceTask

export const doServiceTask = () => {
  return {
    type: ActionTypes.GET_SERVICE_TASK,
  };
};
export const doServiceTaskSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_SERVICE_TASK_SUCCEED,
    payload,
  };
};
export const doServiceTaskFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_SERVICE_TASK_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table ServiceTask

export const doAddServiceTask = (payload: any) => {
  return {
    type: ActionTypes.ADD_SERVICE_TASK,
    payload,
  };
};
export const doAddServiceTaskSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_SERVICE_TASK_SUCCEED,
    payload,
  };
};
export const doAddServiceTaskFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_SERVICE_TASK_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table ServiceTask

export const doUpdateServiceTask = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_SERVICE_TASK,
    payload,
  };
};
export const doUpdateServiceTaskSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_SERVICE_TASK_SUCCEED,
    payload,
  };
};
export const doUpdateServiceTaskFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_SERVICE_TASK_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table ServiceTask

export const doDelServiceTask = (payload: any) => {
  return {
    type: ActionTypes.DEL_SERVICE_TASK,
    payload,
  };
};
export const doDelServiceTaskSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_SERVICE_TASK_SUCCEED,
    payload,
  };
};
export const doDelServiceTaskFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_SERVICE_TASK_FAILED,
    payload,
  };
};
