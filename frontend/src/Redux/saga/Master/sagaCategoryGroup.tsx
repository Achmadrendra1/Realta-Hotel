//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doCategoryGroupSucceed,
  doCategoryGroupFailed,
  doAddCategoryGroupSucceed,
  doAddCategoryGroupFailed,
  doUpdateCategoryGroupSucceed,
  doUpdateCategoryGroupFailed,
  doDelCategoryGroupSucceed,
  doDelCategoryGroupFailed,
} from '../../Action/Master/actionCategoryGroup';
import { API, FORMAPI } from '@/Redux/Configs/consumeApi';
import axios from 'axios';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerCategoryGroup(): any {
  try {
    const result = yield axios(API('GET', '/category'));
    yield put(doCategoryGroupSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doCategoryGroupFailed(error));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerAddCategoryGroup(action: any): any {
  try {
    const res = yield axios(
      FORMAPI('POST', '/category/upload', action.payload)
    );
    yield put(doAddCategoryGroupSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    // const delay = (time: any) =>
    //   new Promise((resolve) => setTimeout(resolve, time));
    // yield put(doAddCategoryGroupFailed(error.response.data.message));
    // yield call(delay, 6000);
    // yield put(doAddCategoryGroupFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateCategoryGroup(action: any): any {
  try {
    yield axios(
      API('PUT', '/category/edit/' + action.payload.cagroId, action.payload)
    );
    yield put(doUpdateCategoryGroupSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateCategoryGroupFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateCategoryGroupFailed(null));
  }
}

//____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteCategoryGroup(action: any): any {
  try {
    yield axios(API('DELETE', '/category/delete/' + action.payload));
    yield put(doDelCategoryGroupSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerCategoryGroup,
  handlerAddCategoryGroup,
  handlerUpdateCategoryGroup,
  handlerDeleteCategoryGroup,
};
