//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doLocationsRCSucceed,
  doLocationsRCFailed,
  doAddLocationsRCSucceed,
  doAddLocationsRCFailed,
  doUpdateLocationsRCSucceed,
  doUpdateLocationsRCFailed,
  doDelLocationsRCSucceed,
  doDelLocationsRCFailed,
} from '../../Action/Master/actionLocationsRC';
import { API } from '@/Redux/Configs/consumeApi';

import axios from "axios";

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerLocationsRC(): any {
  try {
    const result = yield axios(API('GET', '/regions/locationsRC'));
    yield put(doLocationsRCSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doLocationsRCFailed(error));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerAddLocationsRC(action: any): any {
  try {
    const res = yield axios(API('POST', '/country/insert', action.payload));
    yield put(doAddLocationsRCSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddLocationsRCFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddLocationsRCFailed(null));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocationsRC(action: any): any {
  try {
    yield axios(
      API("PUT", "/regions/locationsRC/edit/" + action.payload.region_code, action.payload)
    );
    yield put(doUpdateLocationsRCSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateLocationsRCFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateLocationsRCFailed(null));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteLocationsRC(action: any): any {
  try {
    yield axios(API("DELETE", "/regions/locationsRC/delete/" + action.payload));
    yield put(doDelLocationsRCSucceed(action.payload));
  } catch (error: any) {
  }
}



//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocationsRC,
  handlerAddLocationsRC,
  handlerUpdateLocationsRC,
  handlerDeleteLocationsRC,
};

