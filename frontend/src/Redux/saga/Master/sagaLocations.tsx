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


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocations(action: any): any {
  try {
    yield axios(
      API("PUT", "/regions/locations/edit/" + action.payload.region_code, action.payload)
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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete
function* handlerDeleteLocations(action: any): any {
  try {
    yield axios(API("DELETE", "/regions/locations/delete/" + action.payload));
    yield put(doDelLocationsSucceed(action.payload));
  } catch (error: any) {
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocations,
  handlerAddLocations,
  handlerUpdateLocations,
  handlerDeleteLocations,
};

