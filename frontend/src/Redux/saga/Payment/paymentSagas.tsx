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
  doUsacRequestFailed,
  doUsacRequestSuccess,
} from "@/Redux/Action/Payment/paymentDashAction";
import {
  doCheckSecureCodeFailed,
  doCheckSecureCodeSuccess,
  doCreateAccountFailed,
  doCreateAccountSuccess,
  doCreateTransactionSuccess,
  doDeleteAccountSuccess,
  doGetAllBankFailed,
  doGetAllBankSuccess,
  doGetHistoryFailed,
  doGetHistorySuccess,
  doTopUpFailed,
  doTopUpSuccess,
  doUpdatePinFailed,
  doUpdatePinSuccess,
} from "@/Redux/Action/Payment/paymentUserAction";
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";

//List Transaction
function* handleTrxDashRequest(action: any): any {
  try {
    const pageQueryParam = action.payload?.page
      ? `page=${action.payload.page}`
      : "";
    const keywordQueryParam = action.payload?.keyword
      ? `&keyword=${action.payload.keyword}`
      : "";
    const dateQueryParam = action.payload?.startDate
      ? `&startDate=${action.payload.startDate}&endDate=${action.payload.endDate}`
      : "";
    const result = yield axios(
      API(
        "GET",
        `/payment-transaction?${pageQueryParam}${keywordQueryParam}${dateQueryParam}`
      )
    );
    yield put(doTransactionRequestSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(doTransactionRequestFailed(e));
  }
}

function* handleGetHistoryTrx(action: any): any {
  try {
    const dateQueryParam = action.payload?.startDate
      ? `&startDate=${action.payload.startDate}&endDate=${action.payload.endDate}`
      : "";
      const keywordQueryParam = action.payload?.keyword
      ? `&keyword=${action.payload.keyword}`
      : "";
    const res = yield axios(
      API("GET", `/payment-transaction/all?${dateQueryParam}${keywordQueryParam}`)
    );
    yield put(doGetHistorySuccess(res.data));
  } catch (error: any) {
    yield put(doGetHistoryFailed(error));
  }
}

//Bank
function* handleBankRequest(action: any): any {
  try {
    const pageQueryParam = action.payload?.page
      ? `page=${action.payload.page}`
      : "";
    const keywordQueryParam = action.payload?.keyword
      ? `&keyword=${action.payload.keyword}`
      : "";
    const result = yield axios(
      API("GET", `/bank?${pageQueryParam}${keywordQueryParam}`)
    );
    yield put(doBankRequestSuccess(result.data));
    return result.data;
  } catch (error) {
    // console.log(error);
    yield put(doBankRequestFailed(error));
  }
}

function* handleBankAllRequest(): any {
  try {
    const res = yield axios(API("GET", "/bank/all"));
    yield put(doGetAllBankSuccess(res.data));
  } catch (error) {
    yield put(doGetAllBankFailed(error));
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
    // console.log(error);
  }
}

//Payment Gateway
function* handlePagaRequest(action: any): any {
  try {
    const pageQueryParam = action.payload?.page
      ? `page=${action.payload.page}`
      : "";
    const keywordQueryParam = action.payload?.keyword
      ? `&keyword=${action.payload.keyword}`
      : "";
    const res = yield axios(
      API("GET", `/payment-gateway?${pageQueryParam}${keywordQueryParam}`)
    );
    yield put(doPagaRequestSuccess(res.data));
    return res.data;
  } catch (error) {
    // console.log(error);
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
    // console.log(error);
  }
}

//User Account
function* handleUsacRequest(action: any): any {
  try {
    const res = yield axios(API("GET", `/user-account/${action.payload}`));
    yield put(doUsacRequestSuccess(res.data));
  } catch (error) {
    yield put(doUsacRequestFailed(error));
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

function* handleUpdatePin(action: any): any {
  const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));
  try {
    const res = yield axios(API('PUT', '/user-account', action.payload))
    yield put(doUpdatePinSuccess({
      message : res.data.message,
      status : true
    }))
    yield call(delay, 2000)
    yield put(doUpdatePinSuccess({
      message : null,
      status : null
    }))
    // console.log(res.data)
    // yield put(doUpdatePinSuccess(res.data))
  } catch (error: any) {}
}

function* handleTopUp(action: any): any {
  const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const result = yield axios(
    API("POST", "/payment-transaction", action.payload)
  );
  // console.log(action.payload)
  yield call(delay, 2000);
  yield put(
    doTopUpSuccess({
      message: "Top Up Success",
      status: null,
      data: result.data,
    })
  );
  yield call(delay, 2000);
  yield put(doTopUpSuccess({ message: null, status: null, data: result.data }));
}

function* handleCreateTransaction(action: any): any {
  const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));
  yield axios(API("POST", "/payment-transaction", action.payload));
  yield put(doCreateTransactionSuccess({ status: null }));
  yield call(delay, 3000);
  yield put(doCreateTransactionSuccess({ message: null }));
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
  handleCreateTransaction,
  handleBankAllRequest,
  handleUpdatePin
};
