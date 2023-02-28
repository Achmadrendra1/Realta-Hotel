//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doLocationsSucceed,
  doLocationsFailed,
  doAddLocationsSucceed,
  doAddLocationsFailed,
  doUpdateLocationsSucceed,
  doUpdateLocationsFailed,
  doDelLocationsSucceed,
  doDelLocationsFailed,
} from '../../Action/Master/actionLocations';
import apiLocations from '@/Redux/Service/master/apiMasterLocations';
import { API } from '@/Redux/Configs/consumeApi';
import axios from "axios";


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerLocations(): any {
  try {
    const result = yield axios(API('GET', '/regions/locations'));
    yield put(doLocationsSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doLocationsFailed(error));
  }
}


// Alternatif with Service
// function* handlerLocations(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiLocations.getLocations);
//     // console.log(result.data);
//     yield put(doLocationsSucceed(result.data));
//   } catch (error) {
//     yield put(doLocationsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddLocations(action: any): any {
  try {
    const res = yield axios(API('POST', '/regions/locations/insert', action.payload));
    yield put(doAddLocationsSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddLocationsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddLocationsFailed(null));
  }
}

// function* handlerAddLocations(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//    const res=  yield call(apiLocations.addLocations, action.payload);
//     yield put(doAddLocationsSucceed(action.payload)); 
//   } catch (error) {
//     yield put(doAddLocationsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocations(action: any): any {
  try {
    yield axios(
      API("PUT", "regions/locations/edit/" + action.payload.regionCode, action.payload)
    );
    yield put(doUpdateLocationsSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateLocationsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateLocationsFailed(null));
  }
}

// function* handlerUpdateLocations(action: any) {
//   try {
//     yield call(apiLocations.updateLocations, action.payload);
//     yield put(doUpdateLocationsSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateLocationsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete
function* handlerDeleteLocations(action: any): any {
  try {
    yield axios(API("DELETE", "/regions/locations/delete/" + action.payload));
    yield put(doDelLocationsSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteLocations(action: any) {
//   try {
//     yield call(apiLocations.deleteLocations, action.payload);
//     yield put(doDelLocationsSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelLocationsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocations,
  handlerAddLocations,
  handlerUpdateLocations,
  handlerDeleteLocations,
};

