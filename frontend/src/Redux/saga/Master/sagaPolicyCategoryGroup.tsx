//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doPolicyCategoryGroupSucceed,
  doPolicyCategoryGroupFailed,
  doAddPolicyCategoryGroupSucceed,
  doAddPolicyCategoryGroupFailed,
  doUpdatePolicyCategoryGroupSucceed,
  doUpdatePolicyCategoryGroupFailed,
  doDelPolicyCategoryGroupSucceed,
  doDelPolicyCategoryGroupFailed,
} from '../../Action/Master/actionPolicyCategoryGroup';
import apiPolicyCategoryGroup from '@/Redux/Service/master/apiMasterPolicyCategoryGroup';
import axios from "axios";
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerPolicyCategoryGroup(): any {
  try {
    const result = yield axios(API('GET', '/policy-category-group'));
    yield put(doPolicyCategoryGroupSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doPolicyCategoryGroupFailed(error));
  }
}

// function* handlerPolicyCategoryGroup(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiPolicyCategoryGroup.getPolicyCategoryGroup);
//     // console.log('saga Policy Category :', result);

//     yield put(doPolicyCategoryGroupSucceed(result.data));
//   } catch (error) {
//     yield put(doPolicyCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddPolicyCategoryGroup(action: any): any {
  try {
    const res = yield axios(API('POST', '/policy-category-group/insert', action.payload));
    yield put(doAddPolicyCategoryGroupSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddPolicyCategoryGroupFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddPolicyCategoryGroupFailed(null));
  }
}
// function* handlerAddPolicyCategoryGroup(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiPolicyCategoryGroup.addPolicyCategoryGroup, action.payload);
//     yield put(doAddPolicyCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddPolicyCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE


function* handlerUpdatePolicyCategoryGroup(action: any): any {
  try {
    yield axios(
      API("PUT", "policy-category-group/edit/" + action.payload.pocaId, action.payload)
    );
    yield put(doUpdatePolicyCategoryGroupSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdatePolicyCategoryGroupFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdatePolicyCategoryGroupFailed(null));
  }
}

// function* handlerUpdatePolicyCategoryGroup(action: any) {
//   try {
//     yield call(apiPolicyCategoryGroup.updatePolicyCategoryGroup, action.payload);
//     yield put(doUpdatePolicyCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdatePolicyCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerDeletePolicyCategoryGroup(action: any): any {
  try {
    yield axios(API("DELETE", "/policy-category-group/delete/" + action.payload));
    yield put(doDelPolicyCategoryGroupSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeletePolicyCategoryGroup(action: any) {
//   try {
//     yield call(apiPolicyCategoryGroup.deletePolicyCategoryGroup, action.payload);
//     yield put(doDelPolicyCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelPolicyCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerPolicyCategoryGroup,
  handlerAddPolicyCategoryGroup,
  handlerUpdatePolicyCategoryGroup,
  handlerDeletePolicyCategoryGroup,
};
