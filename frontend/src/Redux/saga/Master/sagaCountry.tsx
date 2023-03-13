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
import { API } from '@/Redux/Configs/consumeApi';
import axios from 'axios';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerCountry(): any {
  try {
    const result = yield axios(API('GET', '/country'));
    yield put(doCountrySucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doCountryFailed(error));
  }
}

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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateCountry(action: any): any {
  try {
    yield axios(
      API('PUT', '/country/edit/' + action.payload.country_id, action.payload)
    );
    yield put(doUpdateCountrySucceed(action.payload));
  } catch (error: any) {
    // const delay = (time: any) =>
    //   new Promise((resolve) => setTimeout(resolve, time));
    // yield put(doUpdateCountryFailed(error.response.data.message));
    // yield call(delay, 6000);
    yield put(doUpdateCountryFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteCountry(action: any): any {
  try {
    yield axios(API('DELETE', '/country/delete/' + action.payload));
    yield put(doDelCountrySucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerCountry,
  handlerAddCountry,
  handlerUpdateCountry,
  handlerDeleteCountry,
};
