//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doMembersSucceed,
  doMembersFailed,
  doAddMembersSucceed,
  doAddMembersFailed,
  doUpdateMembersSucceed,
  doUpdateMembersFailed,
  doDelMembersSucceed,
  doDelMembersFailed,
} from '../../Action/Master/actionMembers';
import axios from "axios";
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerMembers(): any {
  try {
    const result = yield axios(API('GET', '/members'));
    yield put(doMembersSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doMembersFailed(error));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddMembers(action: any): any {
  try {
    const res = yield axios(API('POST', '/members/insert', action.payload));
    yield put(doAddMembersSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddMembersFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddMembersFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateMembers(action: any): any {
  try {
    yield axios(
      API("PUT", "/members/edit/" + action.payload.membName, action.payload)
    );
    yield put(doUpdateMembersSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateMembersFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateMembersFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete 
function* handlerDeleteMembers(action: any): any {
  try {
    yield axios(API("DELETE", "/members/delete/" + action.payload));
    yield put(doDelMembersSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerMembers,
  handlerAddMembers,
  handlerUpdateMembers,
  handlerDeleteMembers,
};
