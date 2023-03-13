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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddLocationsRCP(action: any): any {
  try {
    const res = yield axios(API('POST', '/provinces/insert', action.payload));
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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocationsRCP(action: any): any {
  try {
    yield axios(
      API(
        'PUT',
        '/regions/locationsRCP/edit/' + action.payload.region_code,
        action.payload
      )
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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete
function* handlerDeleteLocationsRCP(action: any): any {
  try {
    yield axios(
      API('DELETE', '/regions/locationsRCP/delete/' + action.payload)
    );
    yield put(doDelLocationsRCPSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocationsRCP,
  handlerAddLocationsRCP,
  handlerUpdateLocationsRCP,
  handlerDeleteLocationsRCP,
};
