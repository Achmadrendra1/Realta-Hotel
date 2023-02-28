//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doProvincesSucceed,
  doProvincesFailed,
  doAddProvincesSucceed,
  doAddProvincesFailed,
  doUpdateProvincesSucceed,
  doUpdateProvincesFailed,
  doDelProvincesSucceed,
  doDelProvincesFailed,
} from '../../Action/Master/actionProvinces';
import apiProvinces from '@/Redux/Service/master/apiMasterProvinces';
import axios from "axios";
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerProvinces(): any {
  try {
    const result = yield axios(API('GET', '/provinces'));
    yield put(doProvincesSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doProvincesFailed(error));
  }
}

// function* handlerProvinces(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiProvinces.getProvinces);
//     // console.log('saga provinces:', result.data); 
//     yield put(doProvincesSucceed(result.data));
//   } catch (error) {
//     yield put(doProvincesFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddProvinces(action: any): any {
  try {
    const res = yield axios(API('POST', '/provinces/insert', action.payload));
    yield put(doAddProvincesSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddProvincesFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddProvincesFailed(null));
  }
}

// function* handlerAddProvinces(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiProvinces.addProvinces, action.payload);
//     yield put(doAddProvincesSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddProvincesFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateProvinces(action: any): any {
  try {
    yield axios(
      API("PUT", "provinces/edit/" + action.payload.provId, action.payload)
    );
    yield put(doUpdateProvincesSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateProvincesFailed(error.response.data.message));
    yield call(delay, 6000);
    doUpdateProvincesFailed  }
}

// function* handlerUpdateProvinces(action: any) {
//   try {
//     yield call(apiProvinces.updateProvinces, action.payload);
//     yield put(doUpdateProvincesSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateProvincesFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteProvinces(action: any): any {
  try {
    yield axios(API("DELETE", "/provinces/delete/" + action.payload));
    yield put(doDelProvincesSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteProvinces(action: any) {
//   try {
//     yield call(apiProvinces.deleteProvinces, action.payload);
//     yield put(doDelProvincesSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelProvincesFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerProvinces,
  handlerAddProvinces,
  handlerUpdateProvinces,
  handlerDeleteProvinces,
};
