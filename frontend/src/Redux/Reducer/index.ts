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
//Master
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

  //Booking,
  BoorReducer,
  SpofReducer,
  FaciBoorReducer,
  HotelBoorReducer,
  ReviewBoorReducer

});
