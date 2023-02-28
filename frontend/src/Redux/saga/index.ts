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
import { HandleEditProfile, HandleGetUser } from "./User/getUser";
import PaymentConst from "../Constant/Payment/PaymentConst";
import { handleTrxDashRequest, handlePagaRequest, handlePagaCreate, handlePagaUpdate, handlePagaDelete, handleBankRequest, handleBankAdd, handleUpdateBank, handleDeleteBank, handleUsacRequest, handleUsacCreate, handleUsacDelete, handleTopUp, handleCheckSecure, handleGetHistoryTrx } from "./Payment/paymentSagas";
import PurchasingConst from '../Constant/Purchasing/PurchasingConst'
import { handleStock, handleStockAdd, handleStockUpdate, handleStockDelete } from './Purchasing/stockSaga'
import { handleStod, handleStodAdd, handleStodDelete, handleStodUpdate } from './Purchasing/stodSaga'
import { handleVendor, handleVendorAdd, handleVendorDelete, handleVendorUpdate } from './Purchasing/vendorSaga'
import { handleVepro, handleVeproAdd, handleVeproDelete, handleVeproUpdate } from './Purchasing/veproSaga'
import { handlePohe, handlePoheAdd, handlePoheDelete, handlePoheUpdate } from './Purchasing/poheSaga'
import { handlePode, handlePodeAdd, handlePodeDelete, handlePodeUpdate } from './Purchasing/podeSaga'

export default function* rootSaga() {
  yield all([
    takeEvery(UserConst.LOGIN_USER, HandleLoginUser),
    takeEvery(UserConst.GET_DATA_USER, HandleGetUser),
    takeEvery(UserConst.EDIT_DATA_PROFILE,HandleEditProfile),

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
    takeEvery(PaymentConst.GET_HISTORY_PAYMENT, handleGetHistoryTrx),

    takeEvery(PurchasingConst.GET_STOCKS, handleStock),
    takeEvery(PurchasingConst.ADD_STOCKS, handleStockAdd),
    takeEvery(PurchasingConst.EDIT_STOCKS, handleStockUpdate),
    takeEvery(PurchasingConst.DEL_STOCKS, handleStockDelete),
    takeEvery(PurchasingConst.GET_STOD, handleStod),
    takeEvery(PurchasingConst.ADD_STOD, handleStodAdd),
    takeEvery(PurchasingConst.EDIT_STOD, handleStodUpdate),
    takeEvery(PurchasingConst.DEL_STOD, handleStodDelete),
    takeEvery(PurchasingConst.GET_VENDOR, handleVendor),
    takeEvery(PurchasingConst.ADD_VENDOR, handleVendorAdd),
    takeEvery(PurchasingConst.EDIT_VENDOR, handleVendorUpdate),
    takeEvery(PurchasingConst.DEL_VENDOR, handleVendorDelete),
    takeEvery(PurchasingConst.GET_VEPRO, handleVepro),
    takeEvery(PurchasingConst.ADD_VEPRO, handleVeproAdd),
    takeEvery(PurchasingConst.EDIT_VEPRO, handleVeproUpdate),
    takeEvery(PurchasingConst.DEL_VEPRO, handleVeproDelete),
    takeEvery(PurchasingConst.GET_POHE, handlePohe),
    takeEvery(PurchasingConst.ADD_POHE, handlePoheAdd),
    takeEvery(PurchasingConst.EDIT_POHE, handlePoheUpdate),
    takeEvery(PurchasingConst.DEL_POHE, handlePoheDelete),
    takeEvery(PurchasingConst.GET_PODE, handlePode),
    takeEvery(PurchasingConst.ADD_PODE, handlePodeAdd),
    takeEvery(PurchasingConst.EDIT_PODE, handlePodeUpdate),
    takeEvery(PurchasingConst.DEL_PODE, handlePodeDelete),
  ]);
}
