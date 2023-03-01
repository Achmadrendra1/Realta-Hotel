import {
  doAddBankFailed,
  doAddBankSuccess,
  doBankRequest,
  doBankRequestFailed,
  doBankRequestSuccess,
  doDeleteBankFailed,
  doDeleteBankSuccess,
  doPagaCreatFailed,
  doPagaCreateSuccess,
  doPagaDeleteSuccess,
  doPagaRequestSuccess,
  doPagaUpdateFailed,
  doPagaUpdateSuccess,
  doTransactionRequestFailed,
  doTransactionRequestSuccess,
  doUpdateBankFailed,
  doUpdateBankSuccess,
  doUsacRequestSuccess,
} from "@/Redux/Action/Payment/paymentDashAction";
import {
  doCheckSecureCodeFailed,
  doCheckSecureCodeSuccess,
  doCreateAccountFailed,
  doCreateAccountSuccess,
  doCreateTransactionSuccess,
  doDeleteAccountSuccess,
  doGetHistoryFailed,
  doGetHistorySuccess,
  doTopUpFailed,
  doTopUpSuccess,
} from "@/Redux/Action/Payment/paymentUserAction";
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";

//List Transaction
function* handleTrxDashRequest(): any {
  try {
    const result = yield axios(API("GET", `/payment-transaction/history`));
    yield put(doTransactionRequestSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(doTransactionRequestFailed(e));
  }
}

//Bank
function* handleBankRequest(): any {
  try {
    const result = yield axios(API("GET", "/bank"));
    yield put(doBankRequestSuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(doBankRequestFailed(error));
  }
}

function* handleBankAdd(action: any): any {
  try {
    const res = yield axios(API("POST", "/bank", action.payload));
    yield put(doAddBankSuccess(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddBankFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddBankFailed(null));
  }
}

function* handleUpdateBank(action: any): any {
  try {
    yield axios(
      API("PUT", "/bank/" + action.payload.bankEntityId, action.payload)
    );
    yield put(doUpdateBankSuccess(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateBankFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateBankFailed(null));
  }
}

function* handleDeleteBank(action: any): any {
  try {
    yield axios(API("DELETE", "/bank/" + action.payload));
    yield put(doDeleteBankSuccess(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

//Payment Gateway
function* handlePagaRequest(): any {
  try {
    const res = yield axios(API("GET", "/payment-gateway"));
    yield put(doPagaRequestSuccess(res.data));
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function* handlePagaCreate(action: any): any {
  try {
    const res = yield axios(API("POST", "/payment-gateway", action.payload));
    yield put(doPagaCreateSuccess(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doPagaCreatFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doPagaCreatFailed(null));
  }
}

function* handlePagaUpdate(action: any): any {
  try {
    yield axios(
      API(
        "PUT",
        "/payment-gateway/" + action.payload.pagaEntityId,
        action.payload
      )
    );
    yield put(doPagaUpdateSuccess(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doPagaUpdateFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doPagaUpdateFailed(null));
  }
}

function* handlePagaDelete(action: any): any {
  try {
    const res = yield axios(
      API("DELETE", "/payment-gateway/" + action.payload)
    );
    yield put(doPagaDeleteSuccess(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

//User Account
function* handleUsacRequest(): any {
  try {
    const res = yield axios(API("GET", "/user-account"));
    yield put(doUsacRequestSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* handleUsacCreate(action: any): any {
  try {
    const res = yield axios(API("post", "/user-account", action.payload));
    // console.log(res.data.result)
    yield put(doCreateAccountSuccess(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doCreateAccountFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doCreateAccountFailed(null));
  }
}

function* handleUsacDelete(action: any): any {
  try {
    yield axios(API("DELETE", "/user-account/" + action.payload));
    yield put(doDeleteAccountSuccess(action.payload));
    // console.log('test action', action.payload)
  } catch (error: any) {
    console.log(error);
  }
}

function* handleCheckSecure(action: any): any {
  const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));
  try {
    const res = yield axios(
      API("POST", "/user-account/check", {
        sourceNumber: action.payload.sourceNumber,
        secureCode: action.payload.secureCode,
      })
    );
    yield put(doCheckSecureCodeSuccess(res.data));
  } catch (error: any) {
    yield put(doCheckSecureCodeFailed(error.response.data));
    yield call(delay, 2000);
    yield put(doCheckSecureCodeFailed({ message: null, status: null }));
  }
}

function* handleTopUp(action: any): any {
  const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));
    
    const result = yield axios(
      API("POST", "/payment-transaction", action.payload)
    );
    // console.log(action.payload)
    yield call(delay, 2000)
    yield put(doTopUpSuccess({ message: "Top Up Success", status:null, data: result.data }));
    yield call(delay, 2000)
    yield put(doTopUpSuccess({ message: null, status:null, data: result.data }))
}

function* handleCreateTransaction(action:any):any {
  const delay = (time: any) =>
  new Promise((resolve) => setTimeout(resolve, time));
  yield axios(API('POST', '/payment-transaction', action.payload))
  yield put(doCreateTransactionSuccess({message : 'Transaksi Berhasil'}))
  yield call(delay, 3000)
  yield put(doCreateAccountSuccess({message : null}))
}

function* handleGetHistoryTrx():any{
  try {
    const res = yield axios(API('GET', '/payment-transaction'))
    yield put(doGetHistorySuccess(res.data))
  } catch (error:any) {
    yield put(doGetHistoryFailed(error))
  }
}

export {
  handleTrxDashRequest,
  handleBankRequest,
  handleBankAdd,
  handleUpdateBank,
  handleDeleteBank,
  handlePagaRequest,
  handlePagaCreate,
  handlePagaUpdate,
  handlePagaDelete,
  handleUsacRequest,
  handleUsacCreate,
  handleUsacDelete,
  handleTopUp,
  handleCheckSecure,
  handleGetHistoryTrx,
  handleCreateTransaction
};
