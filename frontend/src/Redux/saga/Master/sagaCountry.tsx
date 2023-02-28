//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doCountrySucceed,
  doCountryFailed,
  doAddCountrySucceed,
  doAddCountryFailed,
  doUpdateCountrySucceed,
  doUpdateCountryFailed,
  doDelCountrySucceed,
  doDelCountryFailed,
} from '../../Action/Master/actionCountry';
import apiCountry from '@/Redux/Service/master/apiMasterCountry';
import { API } from '@/Redux/Configs/consumeApi';
import axios from "axios";


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerCountry  (): any {
  try {
    const result = yield axios(API('GET', '/country'));
    yield put(doCountrySucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doCountryFailed(error));
  }
}

// function* handlerCountry(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiCountry.getCountry);
//     // console.log('saga Country :', result);
//     yield put(doCountrySucceed(result.data));
//   } catch (error) {
//     yield put(doCountryFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddCountry(action: any): any {
  try {
    const res = yield axios(API('POST', '/country/insert', action.payload));
    yield put(doAddCountrySucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddCountryFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddCountryFailed(null));
  }
}


// function* handlerAddCountry(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiCountry.addCountry, action.payload);
//     yield put(doAddCountrySucceed(action.payload));
//   } catch (error) {
//     yield put(doAddCountryFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateCountry(action: any): any {
  try {
    yield axios(
      API("PUT", "country/edit/" + action.payload.countryId, action.payload)
    );
    yield put(doUpdateCountrySucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateCountryFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateCountryFailed(null));
  }
}

// function* handlerUpdateCountry(action: any) {
//   try {
//     yield call(apiCountry.updateCountry, action.payload);
//     yield put(doUpdateCountrySucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateCountryFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteCountry(action: any): any {
  try {
    yield axios(API("DELETE", "/country/delete/" + action.payload));
    yield put(doDelCountrySucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}


// function* handlerDeleteCountry(action: any) {
//   try {
//     yield call(apiCountry.deleteCountry, action.payload);
//     yield put(doDelCountrySucceed(action.payload));
//   } catch (error) {
//     yield put(doDelCountryFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerCountry,
  handlerAddCountry,
  handlerUpdateCountry,
  handlerDeleteCountry,
};
 