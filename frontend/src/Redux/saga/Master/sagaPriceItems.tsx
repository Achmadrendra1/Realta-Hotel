//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doPriceItemsSucceed,
  doPriceItemsFailed,
  doAddPriceItemsSucceed,
  doAddPriceItemsFailed,
  doUpdatePriceItemsSucceed,
  doUpdatePriceItemsFailed,
  doDelPriceItemsSucceed,
  doDelPriceItemsFailed,
} from '../../Action/Master/actionPriceItems';
import axios from "axios";
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerPriceItems(): any {
  try {
    const result = yield axios(API('GET', '/price'));
    yield put(doPriceItemsSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doPriceItemsFailed(error));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddPriceItems(action: any): any {
  try {
    const res = yield axios(API('POST', '/price/insert', action.payload));
    yield put(doAddPriceItemsSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddPriceItemsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddPriceItemsFailed(null));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdatePriceItems(action: any): any {
  try {
    yield axios(
      API("PUT", "/price/edit/" + action.payload.pritId, action.payload)
    );
    yield put(doUpdatePriceItemsSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdatePriceItemsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdatePriceItemsFailed(null));
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE

function* handlerDeletePriceItems(action: any): any {
  try {
    yield axios(API("DELETE", "/price/delete/" + action.payload));
    yield put(doDelPriceItemsSucceed(action.payload));
  } catch (error: any) {
  }
}


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerPriceItems,
  handlerAddPriceItems,
  handlerUpdatePriceItems,
  handlerDeletePriceItems,
};
