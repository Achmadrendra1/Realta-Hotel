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
import StockReducer from './Purchasing/stockReducer';
import StodReducer from './Purchasing/stodReducer';
import VendorReducer from './Purchasing/vendorReducer';
import VeproReducer from './Purchasing/veproReducer';
import PoheReducer from './Purchasing/poheReducer';
import PodeReducer from './Purchasing/podeReducer';

export default combineReducers({
  DeptReducer,
  employeesReducer,
  detailEmpReducer,
  
  //User And Auth
  loginReducer,
  GetUserReducer,

  //Payment
  payTrxHistoryReducer,
  payBankReducer,
  payPagaReducer,
  payUserAccReducer,

  //Purchasing
  StockReducer,
  StodReducer,
  VendorReducer,
  VeproReducer,
  PoheReducer,
  PodeReducer
});
