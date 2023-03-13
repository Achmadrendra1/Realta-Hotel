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
import axios from 'axios';
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

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateProvinces(action: any): any {
  try {
    yield axios(
      API('PUT', '/provinces/edit/' + action.payload.prov_id, action.payload)
    );
    yield put(doUpdateProvincesSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateProvincesFailed(error.response.data.message));
    yield call(delay, 6000);
    doUpdateProvincesFailed;
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteProvinces(action: any): any {
  try {
    yield axios(API('DELETE', '/provinces/delete/' + action.payload));
    yield put(doDelProvincesSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerProvinces,
  handlerAddProvinces,
  handlerUpdateProvinces,
  handlerDeleteProvinces,
};
