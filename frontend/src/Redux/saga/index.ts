import { all, takeEvery } from "redux-saga/effects";
import {
  handleAddDept,
  handleDeleteDept,
  handleGetDept,
  handleUpdateDept,
} from "./HR/department";
import { deptType } from "../Constant/HR/deptType";
import { empType } from "../Constant/HR/empType";
import { handleDetailEmployee, handleGetEmployees } from "./HR/employees";
import UserConst from "../Constant/User/UserConst";
import { HandleLoginUser } from "./User/auth";
import { HandleEditProfile, HandleGetUser, HandleUpdatePassword } from "./User/getUser";
import PaymentConst from "../Constant/Payment/PaymentConst";
import { handleTrxDashRequest, handlePagaRequest, handlePagaCreate, handlePagaUpdate, handlePagaDelete, handleBankRequest, handleBankAdd, handleUpdateBank, handleDeleteBank, handleUsacRequest, handleUsacCreate, handleUsacDelete, handleTopUp, handleCheckSecure, handleGetHistoryTrx } from "./Payment/paymentSagas";

export default function* rootSaga() {
  yield all([
    takeEvery(UserConst.LOGIN_USER, HandleLoginUser),
    takeEvery(UserConst.GET_DATA_USER, HandleGetUser),
    takeEvery(UserConst.EDIT_DATA_PROFILE,HandleEditProfile),
    takeEvery(UserConst.UPDATE_PASSWORD,HandleUpdatePassword),

    takeEvery(deptType.GET_DATA, handleGetDept),
    takeEvery(deptType.ADD_DATA, handleAddDept),
    takeEvery(deptType.UPDATE_DATA, handleUpdateDept),
    takeEvery(deptType.DELETE_DATA, handleDeleteDept),
    takeEvery(empType.GET_DATA, handleGetEmployees),
    takeEvery(empType.GET_DETAIL, handleDetailEmployee),

    takeEvery(PaymentConst.GET_PAYMENT_HISTORY_DASH, handleTrxDashRequest),
    takeEvery(PaymentConst.GET_PAYMENT_GATEWAY_REQUEST, handlePagaRequest),
    takeEvery(PaymentConst.ADD_PAYMENT_GATEWAY, handlePagaCreate),
    takeEvery(PaymentConst.UPDATE_PAYMENT_GATEWAY, handlePagaUpdate),
    takeEvery(PaymentConst.DELETE_PAYMENT_GATEWAY, handlePagaDelete),
    takeEvery(PaymentConst.GET_BANK_REQUEST, handleBankRequest),
    takeEvery(PaymentConst.ADD_BANK, handleBankAdd),
    takeEvery(PaymentConst.UPDATE_BANK, handleUpdateBank),
    takeEvery(PaymentConst.DELETE_BANK, handleDeleteBank),
    takeEvery(PaymentConst.GET_ACCOUNT_ACTIVE, handleUsacRequest),
    takeEvery(PaymentConst.CREATE_ACCOUNT, handleUsacCreate),
    takeEvery(PaymentConst.DELETE_ACCOUNT, handleUsacDelete),
    takeEvery(PaymentConst.TOP_UP_WALLET, handleTopUp),
    takeEvery(PaymentConst.CHECK_SECURE_CODE, handleCheckSecure),
    takeEvery(PaymentConst.GET_HISTORY_PAYMENT, handleGetHistoryTrx)
  ]);
}
