//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doPolicySucceed,
  doPolicyFailed,
  doAddPolicySucceed,
  doAddPolicyFailed,
  doUpdatePolicySucceed,
  doUpdatePolicyFailed,
  doDelPolicySucceed,
  doDelPolicyFailed,
} from '../../Action/Master/actionPolicy';
import apiPolicy from '@/Redux/Service/master/apiMasterPolicy';
import axios from "axios";
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerPolicy(): any {
  try {
    const result = yield axios(API('GET', '/policy'));
    yield put(doPolicySucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doPolicyFailed(error));
  }
}

// function* handlerPolicy(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiPolicy.getPolicy);
//     // console.log('saga Policy :', result);
//     yield put(doPolicySucceed(result.data));
//   } catch (error) {
//     yield put(doPolicyFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddPolicy(action: any): any {
  try {
    const res = yield axios(API('POST', '/policy/insert', action.payload));
    yield put(doAddPolicySucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddPolicyFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddPolicyFailed(null));
  }
}

// function* handlerAddPolicy(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiPolicy.addPolicy, action.payload);

//     yield put(doAddPolicySucceed(action.payload));
//   } catch (error) {
//     yield put(doAddPolicyFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE

function* handlerUpdatePolicy(action: any): any {
  try {
    yield axios(
      API("PUT", "policy/edit/" + action.payload.poliId, action.payload)
    );
    yield put(doUpdatePolicySucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdatePolicyFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdatePolicyFailed(null));
  }
}

// function* handlerUpdatePolicy(action: any) {
//   try {
//     yield call(apiPolicy.updatePolicy, action.payload);
//     yield put(doUpdatePolicySucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdatePolicyFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete
function* handlerDeletePolicy(action: any): any {
  try {
    yield axios(API("DELETE", "/policy/delete/" + action.payload));
    yield put(doDelPolicySucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeletePolicy(action: any) {
//   try {
//     yield call(apiPolicy.deletePolicy, action.payload);
//     yield put(doDelPolicySucceed(action.payload));
//   } catch (error) {
//     yield put(doDelPolicyFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerPolicy,
  handlerAddPolicy,
  handlerUpdatePolicy,
  handlerDeletePolicy,
};
