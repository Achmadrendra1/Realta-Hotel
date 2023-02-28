//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doLocationsRCPSucceed,
  doLocationsRCPFailed,
  doAddLocationsRCPSucceed,
  doAddLocationsRCPFailed,
  doUpdateLocationsRCPSucceed,
  doUpdateLocationsRCPFailed,
  doDelLocationsRCPSucceed,
  doDelLocationsRCPFailed,
} from '../../Action/Master/actionLocationsRCP';
import apiLocationsRCP from '@/Redux/Service/master/apiMasterLocationsRCP';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerLocationsRCP(): any {
  try {
    const result = yield axios(API('GET', '/regions/locationsRCP'));
    yield put(doLocationsRCPSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doLocationsRCPFailed(error));
  }
}

// Alternatif with Service
// function* handlerLocationsRCP(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiLocationsRCP.getLocationsRCP);
//     // console.log(result.data);
//     yield put(doLocationsRCPSucceed(result.data));
//   } catch (error) {
//     yield put(doLocationsRCPFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddLocationsRCP(action: any): any {
  try {
    const res = yield axios(API('POST', '/regions/locationsRCP/insert', action.payload));
    yield put(doAddLocationsRCPSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddLocationsRCPFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddLocationsRCPFailed(null));
  }
}

// function* handlerAddLocationsRCP(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiLocationsRCP.addLocationsRCP, action.payload);
//     yield put(doAddLocationsRCPSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddLocationsRCPFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocationsRCP(action: any): any {
  try {
    yield axios(
      API('PUT', 'regions/locationsRCP/edit/' + action.payload.regionCode, action.payload)
    );
    yield put(doUpdateLocationsRCPSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateLocationsRCPFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateLocationsRCPFailed(null));
  }
}

// function* handlerUpdateLocationsRCP(action: any) {
//   try {
//     yield call(apiLocationsRCP.updateLocationsRCP, action.payload);
//     yield put(doUpdateLocationsRCPSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateLocationsRCPFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete
function* handlerDeleteLocationsRCP(action: any): any {
  try {
    yield axios(API('DELETE', '/regions/locationsRCP/delete/' + action.payload));
    yield put(doDelLocationsRCPSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteLocationsRCP(action: any) {
//   try {
//     yield call(apiLocationsRCP.deleteLocationsRCP, action.payload);
//     yield put(doDelLocationsRCPSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelLocationsRCPFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocationsRCP,
  handlerAddLocationsRCP,
  handlerUpdateLocationsRCP,
  handlerDeleteLocationsRCP,
};
