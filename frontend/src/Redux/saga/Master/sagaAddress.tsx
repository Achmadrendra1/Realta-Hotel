//Package lib
import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
//Artificial
import {
  doAddressSucceed,
  doAddressFailed,
  doAddAddressSucceed,
  doAddAddressFailed,
  doUpdateAddressSucceed,
  doUpdateAddressFailed,
  doDelAddressSucceed,
  doDelAddressFailed,
} from '../../Action/Master/actionAddress';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET

function* handlerAddress(): any {
  try {
    const result = yield axios(API('GET', '/address'));
    yield put(doAddressSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doAddressFailed(error));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddAddress(action: any): any {
  try {
    const res = yield axios(API('POST', '/address/insert', action.payload));
    yield put(doAddAddressSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddAddressFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddAddressFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE

function* handlerUpdateAddress(action: any): any {
  try {
    yield axios(
      API('PUT', '/address/edit/' + action.payload.addr_id, action.payload)
    );
    yield put(doUpdateAddressSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateAddressFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateAddressFailed(null));
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerDeleteAddress(action: any): any {
  try {
    yield axios(API('DELETE', '/address/delete/' + action.payload));
    yield put(doDelAddressSucceed(action.payload));
  } catch (error: any) {
  }
}

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerAddress,
  handlerAddAddress,
  handlerUpdateAddress,
  handlerDeleteAddress,
};
