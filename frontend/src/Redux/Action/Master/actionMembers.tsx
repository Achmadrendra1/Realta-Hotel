//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table Members

export const doMembers = () => {
  return {
    type: ActionTypes.GET_MEMBERS,
  };
};
export const doMembersSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_MEMBERS_SUCCEED,
    payload,
  };
};
export const doMembersFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_MEMBERS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table Members

export const doAddMembers = (payload: any) => {
  return {
    type: ActionTypes.ADD_MEMBERS,
    payload,
  };
};
export const doAddMembersSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_MEMBERS_SUCCEED,
    payload,
  };
};
export const doAddMembersFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_MEMBERS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table Members

export const doUpdateMembers = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_MEMBERS,
    payload,
  };
};
export const doUpdateMembersSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_MEMBERS_SUCCEED,
    payload,
  };
};
export const doUpdateMembersFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_MEMBERS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table Members

export const doDelMembers = (payload: any) => {
  return {
    type: ActionTypes.DEL_MEMBERS,
    payload,
  };
};
export const doDelMembersSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_MEMBERS_SUCCEED,
    payload,
  };
};
export const doDelMembersFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_MEMBERS_FAILED,
    payload,
  };
};
