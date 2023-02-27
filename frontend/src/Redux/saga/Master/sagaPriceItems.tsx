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
import apiPriceItems from '@/Redux/Service/master/apiMasterPriceItems';
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

// function* handlerPriceItems(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiPriceItems.getPriceItems);
//     // console.log('saga price :', result);

//     yield put(doPriceItemsSucceed(result.data));
//   } catch (error) {
//     yield put(doPriceItemsFailed(error));
//   }
// }

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

// function* handlerAddPriceItems(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiPriceItems.addPriceItems, action.payload);
//     yield put(doAddPriceItemsSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddPriceItemsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdatePriceItems(action: any): any {
  try {
    yield axios(
      API("PUT", "price/edit/" + action.payload.pritId, action.payload)
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

// function* handlerUpdatePriceItems(action: any) {
//   try {
//     yield call(apiPriceItems.updatePriceItems, action.payload);
//     yield put(doUpdatePriceItemsSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdatePriceItemsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE

function* handlerDeletePriceItems(action: any): any {
  try {
    yield axios(API("DELETE", "/price/delete/" + action.payload));
    yield put(doDelPriceItemsSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeletePriceItems(action: any) {
//   try {
//     yield call(apiPriceItems.deletePriceItems, action.payload);
//     yield put(doDelPriceItemsSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelPriceItemsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerPriceItems,
  handlerAddPriceItems,
  handlerUpdatePriceItems,
  handlerDeletePriceItems,
};
