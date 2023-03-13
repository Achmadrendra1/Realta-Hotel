//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doServiceTaskSucceed,
  doServiceTaskFailed,
  doAddServiceTaskSucceed,
  doAddServiceTaskFailed,
  doUpdateServiceTaskSucceed,
  doUpdateServiceTaskFailed,
  doDelServiceTaskSucceed,
  doDelServiceTaskFailed,
} from '../../Action/Master/actionServiceTask';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET

function* handlerServiceTask(): any {
  try {
    const result = yield axios(API('GET', '/service'));
    yield put(doServiceTaskSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doServiceTaskFailed(error));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddServiceTask(action: any): any {
  try {
    const res = yield axios(API('POST', '/service/insert', action.payload));
    yield put(doAddServiceTaskSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddServiceTaskFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddServiceTaskFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateServiceTask(action: any): any {
  try {
    yield axios(
      API('PUT', '/service/edit/' + action.payload.setaId, action.payload)
    );
    yield put(doUpdateServiceTaskSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateServiceTaskFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateServiceTaskFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteServiceTask(action: any): any {
  try {
    yield axios(API('DELETE', '/service/delete/' + action.payload));
    yield put(doDelServiceTaskSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerServiceTask,
  handlerAddServiceTask,
  handlerUpdateServiceTask,
  handlerDeleteServiceTask,
};
