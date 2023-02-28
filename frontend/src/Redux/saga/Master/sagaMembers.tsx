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
import apiMembers from '@/Redux/Service/master/apiMasterMembers';
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

// function* handlerMembers(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiMembers.getMembers);
//     // console.log('saga Members :', result);
    

//     yield put(doMembersSucceed(result.data));
//   } catch (error) {
//     yield put(doMembersFailed(error));
//   }
// }

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

// function* handlerAddMembers(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiMembers.addMembers, action.payload);
//     yield put(doAddMembersSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddMembersFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateMembers(action: any): any {
  try {
    yield axios(
      API("PUT", "members/edit/" + action.payload.membName, action.payload)
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

// function* handlerUpdateMembers(action: any) {
//   try {
//     yield call(apiMembers.updateMembers, action.payload);
//     yield put(doUpdateMembersSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateMembersFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete 
function* handlerDeleteMembers(action: any): any {
  try {
    yield axios(API("DELETE", "/members/delete/" + action.payload));
    yield put(doDelMembersSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteMembers(action: any) {
//   try {
//     yield call(apiMembers.deleteMembers, action.payload);
//     yield put(doDelMembersSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelMembersFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerMembers,
  handlerAddMembers,
  handlerUpdateMembers,
  handlerDeleteMembers,
};
