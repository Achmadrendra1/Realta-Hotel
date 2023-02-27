import { combineReducers } from "redux";
import { DeptReducer } from "./HR/department";
import { employeesReducer } from "./HR/employees";
import { detailEmpReducer } from "./HR/detailEmp";
import GetUserReducer from "./User/GetUserReducer";
import loginReducer from "./User/AuthReducer";
import payTrxHistoryReducer from "./Payment/payTrxHistoryReducer";
import payBankReducer from "./Payment/payBankReducer";
import payPagaReducer from "./Payment/payPagaReducer";
import payUserAccReducer from "./Payment/payUserAccReducer";

export default combineReducers({
  DeptReducer,
  employeesReducer,
  detailEmpReducer,
  loginReducer,
  GetUserReducer,

  //Payment
  payTrxHistoryReducer,
  payBankReducer,
  payPagaReducer,
  payUserAccReducer,
});
