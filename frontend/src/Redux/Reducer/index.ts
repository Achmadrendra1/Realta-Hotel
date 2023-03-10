import { combineReducers } from 'redux';
import { DeptReducer } from './HR/department';
import { employeesReducer } from './HR/employees';
import { detailEmpReducer } from './HR/detailEmp';
import GetUserReducer from './User/GetUserReducer';
import loginReducer from './User/AuthReducer';
import payTrxHistoryReducer from './Payment/payTrxHistoryReducer';
import payBankReducer from './Payment/payBankReducer';
import payPagaReducer from './Payment/payPagaReducer';
import payUserAccReducer from './Payment/payUserAccReducer';
import { selectReducer } from './HR/select';
// Master
import regionsReducer from './Master/regionsReducer';
import provincesReducer from './Master/provincesReducer';
import countryReducer from './Master/countryReducer';
import addressReducer from './Master/addressReducer';
import policyReducer from './Master/policyReducer';
import categoryGroupReducer from './Master/categoryGroupReducer';
import priceItemsReducer from './Master/priceItemsReducer';
import serviceTaskReducer from './Master/serviceTaskReducer';
import locationsReducer from './Master/locationsReducer';
import locationsRCReducer from './Master/locationsRCReducer';
import locationsRCPReducer from './Master/locationsRCPReducer';
import HotelReducer from './Hotel/HotelReducer';
import BoorReducer from './Booking/BoorReducer';
import SpofReducer from './Booking/SpofReducer';
import FaciBoorReducer from './Booking/FaciBoorReducer';
import HotelBoorReducer from './Booking/HotelBoorReducer';
import ReviewBoorReducer from './Booking/ReviewBoorReducer';
import { workorderReducer } from './HR/workorder';
import { workorderDetailReducer } from './HR/workDetail';
import { serviceListReducer } from './HR/serviceList';
import BoorInvoiceReducer from './Booking/BoorInvoiceReducer';
import BoorExtraReducer from './Booking/BoorExtraReducer';
import BoorDetailReducer from './Booking/BoorDetailReducer';

// Purchasing
import { StockReducer } from './Purchasing/stockReducer';
import { StodReducer } from './Purchasing/stodReducer';
import { SphoReducer } from './Purchasing/sphoReducer';
import { VendorReducer } from './Purchasing/vendorReducer';
import { VeproReducer } from './Purchasing/veproReducer';
import { PoheReducer } from './Purchasing/poheReducer';
import { PodeReducer } from './Purchasing/podeReducer';

import restoMenuReducer from './Resto/restoMenuReducer';
import menuReducer from './Resto/menuReducer';
import menuPhotoReducer from './Resto/menuPhotoReducer';
import restoReducer from './Resto/restoReducer';
import orderReducer from './Resto/orderReducer';
import numberOrderReducer from './Resto/numberOrderReducer';
import userOrderReducer from './Resto/userOrderReducer';
import userMenuReducer from './Resto/userMenuReducer';
import LandingReducer from './Hotel/LandingReducer';


export default combineReducers({
  DeptReducer,
  employeesReducer,
  detailEmpReducer,
  selectReducer,

  //User And Auth
  loginReducer,
  GetUserReducer,

  //Payment
  payTrxHistoryReducer,
  payBankReducer,
  payPagaReducer,
  payUserAccReducer,

  //Master
  regionsReducer,
  provincesReducer,
  countryReducer,
  addressReducer,
  policyReducer,
  categoryGroupReducer,
  priceItemsReducer,
  serviceTaskReducer,
  locationsReducer,
  locationsRCReducer,
  locationsRCPReducer,

  //Hotel
  HotelReducer,
  LandingReducer,

  //Booking,
  BoorReducer,
  SpofReducer,
  FaciBoorReducer,
  HotelBoorReducer,
  ReviewBoorReducer,
  BoorInvoiceReducer,
  BoorExtraReducer,
  BoorDetailReducer,
  
  //Purchasing
  StockReducer,
  StodReducer,
  SphoReducer,
  VendorReducer,
  VeproReducer,
  PoheReducer,
  PodeReducer,

  //Resto
  restoMenuReducer,
  menuReducer,
  menuPhotoReducer,
  restoReducer,
  orderReducer,
  numberOrderReducer,
  userOrderReducer,
  userMenuReducer,

  workorderReducer,
  workorderDetailReducer,
  serviceListReducer
});
