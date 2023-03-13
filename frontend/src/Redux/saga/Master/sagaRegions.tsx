//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doRegionsSucceed,
  doRegionsFailed,
  doAddRegionsSucceed,
  doAddRegionsFailed,
  doUpdateRegionsSucceed,
  doUpdateRegionsFailed,
  doDelRegionsSucceed,
  doDelRegionsFailed,
} from '../../Action/Master/actionRegions';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerRegions(): any {
  try {
    const result = yield axios(API('GET', '/regions'));
    yield put(doRegionsSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doRegionsFailed(error));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddRegions(action: any): any {
  try {
    const res = yield axios(API('POST', '/regions/insert', action.payload));
    yield put(doAddRegionsSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddRegionsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddRegionsFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateRegions(action: any): any {
  try {
    yield axios(
      API('PUT', '/regions/edit/' + action.payload.region_code, action.payload)
    );
    yield put(doUpdateRegionsSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateRegionsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateRegionsFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteRegions(action: any): any {
  try {
    yield axios(API('DELETE', '/regions/delete/' + action.payload));
    yield put(doDelRegionsSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerRegions,
  handlerAddRegions,
  handlerUpdateRegions,
  handlerDeleteRegions,
};
