import { all, takeEvery } from "redux-saga/effects";
import {
  handleAddDept,
  handleDeleteDept,
  handleGetDept,
  handleUpdateDept,
} from "./HR/department";
import { deptType } from "../Constant/HR/deptType";
import { empType } from "../Constant/HR/empType";
import { handleAddEmployee, handleDelEmployee, handleDetailEmployee, handleGetEmployees } from "./HR/employees";
import UserConst from "../Constant/User/UserConst";
import { HandleLoginUser } from "./User/auth";
import { HandleEditProfile, HandleGetUser, HandleUpdatePassword } from "./User/getUser";
import PaymentConst from "../Constant/Payment/PaymentConst";
import {
  handleTrxDashRequest,
  handlePagaRequest,
  handlePagaCreate,
  handlePagaUpdate,
  handlePagaDelete,
  handleBankRequest,
  handleBankAdd,
  handleUpdateBank,
  handleDeleteBank,
  handleUsacRequest,
  handleUsacCreate,
  handleUsacDelete,
  handleTopUp,
  handleCheckSecure,
  handleGetHistoryTrx,
} from "./Payment/paymentSagas";

//Master
import {
  handlerAddRegions,
  handlerDeleteRegions,
  handlerRegions,
  handlerUpdateRegions,
} from "./Master/sagaRegions";
import {
  handlerAddCountry,
  handlerDeleteCountry,
  handlerCountry,
  handlerUpdateCountry,
} from "./Master/sagaCountry";
import {
  handlerAddProvinces,
  handlerDeleteProvinces,
  handlerProvinces,
  handlerUpdateProvinces,
} from "./Master/sagaProvinces";
import {
  handlerAddAddress,
  handlerDeleteAddress,
  handlerAddress,
  handlerUpdateAddress,
} from "./Master/sagaAddress";
import {
  handlerAddPolicy,
  handlerDeletePolicy,
  handlerPolicy,
  handlerUpdatePolicy,
} from "./Master/sagaPolicy";
import {
  handlerAddCategoryGroup,
  handlerDeleteCategoryGroup,
  handlerCategoryGroup,
  handlerUpdateCategoryGroup,
} from "./Master/sagaCategoryGroup";
import {
  handlerAddMembers,
  handlerDeleteMembers,
  handlerMembers,
  handlerUpdateMembers,
} from "./Master/sagaMembers";
import {
  handlerAddPriceItems,
  handlerDeletePriceItems,
  handlerPriceItems,
  handlerUpdatePriceItems,
} from "./Master/sagaPriceItems";
import {
  handlerAddServiceTask,
  handlerDeleteServiceTask,
  handlerServiceTask,
  handlerUpdateServiceTask,
} from "./Master/sagaServiceTask";
import {
  handlerAddLocations,
  handlerDeleteLocations,
  handlerLocations,
  handlerUpdateLocations,
} from "./Master/sagaLocations";
import {
  handlerAddLocationsRC,
  handlerDeleteLocationsRC,
  handlerLocationsRC,
  handlerUpdateLocationsRC,
} from "./Master/sagaLocationsRC";
import {
  handlerAddLocationsRCP,
  handlerDeleteLocationsRCP,
  handlerLocationsRCP,
  handlerUpdateLocationsRCP,
} from "./Master/sagaLocationsRCP";
import ActionTypes from "../Constant/Master/masterActionType";
import { jobType } from "../Constant/HR/jobType";
import { handleSelectJob } from "./HR/select";
import HotelConstant from "../Constant/Hotel/HotelConstant";
import {
  handleAddFacilities,
  handleAddFaph,
  handleAddFapho,
  handleAddHotel,
  handleAddress,
  handleDeleteFacility,
  handleDeleteFaph,
  handleDeleteFapho,
  handleDeleteHotel,
  handleFacilities,
  handleFacilityID,
  handleFaph,
  handleFapho,
  handleHotel,
  handleHotelID,
  handleProvince,
  handleUpdateFacilities,
  handleUpdateFaph,
  handleUpdateFapho,
  handleUpdateHotel,
} from "./Hotel/HotelSaga";
import BookingConstant from "../Constant/Booking/BookingConstant";
import { handleBoorCreateFinal, handleBoorLast, handleSpBoorInvoice, handleSpFacilities, handleSpHotel, handleSpHotelReviews, handleSpof } from "./Booking/BookingSaga";

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
    takeEvery(PaymentConst.GET_HISTORY_PAYMENT, handleGetHistoryTrx),

    //Master Regions
    takeEvery(ActionTypes.GET_REGIONS, handlerRegions),
    takeEvery(ActionTypes.ADD_REGIONS, handlerAddRegions),
    takeEvery(ActionTypes.UPDATE_REGIONS, handlerUpdateRegions),
    takeEvery(ActionTypes.DEL_REGIONS, handlerDeleteRegions),
    //Master COUNTRY
    takeEvery(ActionTypes.GET_COUNTRY, handlerCountry),
    takeEvery(ActionTypes.ADD_COUNTRY, handlerAddCountry),
    takeEvery(ActionTypes.UPDATE_COUNTRY, handlerUpdateCountry),
    takeEvery(ActionTypes.DEL_COUNTRY, handlerDeleteCountry),
    //Master Provinces
    takeEvery(ActionTypes.GET_PROVINCES, handlerProvinces),
    takeEvery(ActionTypes.ADD_PROVINCES, handlerAddProvinces),
    takeEvery(ActionTypes.UPDATE_PROVINCES, handlerUpdateProvinces),
    takeEvery(ActionTypes.DEL_PROVINCES, handlerDeleteProvinces),
    //Master Address
    takeEvery(ActionTypes.GET_ADDRESS, handlerAddress),
    takeEvery(ActionTypes.ADD_ADDRESS, handlerAddAddress),
    takeEvery(ActionTypes.UPDATE_ADDRESS, handlerUpdateAddress),
    takeEvery(ActionTypes.DEL_ADDRESS, handlerDeleteAddress),
    //Master Policy
    takeEvery(ActionTypes.GET_POLICY, handlerPolicy),
    takeEvery(ActionTypes.ADD_POLICY, handlerAddPolicy),
    takeEvery(ActionTypes.UPDATE_POLICY, handlerUpdatePolicy),
    takeEvery(ActionTypes.DEL_POLICY, handlerDeletePolicy),
    //Master CateGory Group
    takeEvery(ActionTypes.GET_CATEGORY_GROUP, handlerCategoryGroup),
    takeEvery(ActionTypes.ADD_CATEGORY_GROUP, handlerAddCategoryGroup),
    takeEvery(ActionTypes.UPDATE_CATEGORY_GROUP, handlerUpdateCategoryGroup),
    takeEvery(ActionTypes.DEL_CATEGORY_GROUP, handlerDeleteCategoryGroup),
    //Master Members
    takeEvery(ActionTypes.GET_MEMBERS, handlerMembers),
    takeEvery(ActionTypes.ADD_MEMBERS, handlerAddMembers),
    takeEvery(ActionTypes.UPDATE_MEMBERS, handlerUpdateMembers),
    takeEvery(ActionTypes.DEL_MEMBERS, handlerDeleteMembers),
    //Master Price Item
    takeEvery(ActionTypes.GET_PRICE_ITEMS, handlerPriceItems),
    takeEvery(ActionTypes.ADD_PRICE_ITEMS, handlerAddPriceItems),
    takeEvery(ActionTypes.UPDATE_PRICE_ITEMS, handlerUpdatePriceItems),
    takeEvery(ActionTypes.DEL_PRICE_ITEMS, handlerDeletePriceItems),
    //Master Service Task
    takeEvery(ActionTypes.GET_SERVICE_TASK, handlerServiceTask),
    takeEvery(ActionTypes.ADD_SERVICE_TASK, handlerAddServiceTask),
    takeEvery(ActionTypes.UPDATE_SERVICE_TASK, handlerUpdateServiceTask),
    takeEvery(ActionTypes.DEL_SERVICE_TASK, handlerDeleteServiceTask),
    //Master Locations
    takeEvery(ActionTypes.GET_LOCATIONS, handlerLocations),
    takeEvery(ActionTypes.ADD_LOCATIONS, handlerAddLocations),
    takeEvery(ActionTypes.UPDATE_LOCATIONS, handlerUpdateLocations),
    takeEvery(ActionTypes.DEL_LOCATIONS, handlerDeleteLocations),
    //Master LocationsRC
    takeEvery(ActionTypes.GET_LOCATIONSRC, handlerLocationsRC),
    takeEvery(ActionTypes.ADD_LOCATIONSRC, handlerAddLocationsRC),
    takeEvery(ActionTypes.UPDATE_LOCATIONSRC, handlerUpdateLocationsRC),
    takeEvery(ActionTypes.DEL_LOCATIONSRC, handlerDeleteLocationsRC),
    //Master LocationsRCP
    takeEvery(ActionTypes.GET_LOCATIONSRCP, handlerLocationsRCP),
    takeEvery(ActionTypes.ADD_LOCATIONSRCP, handlerAddLocationsRCP),
    takeEvery(ActionTypes.UPDATE_LOCATIONSRCP, handlerUpdateLocationsRCP),
    takeEvery(ActionTypes.DEL_LOCATIONSRCP, handlerDeleteLocationsRCP),

    // HR
    takeEvery(deptType.GET_DATA, handleGetDept),
    takeEvery(deptType.ADD_DATA, handleAddDept),
    takeEvery(deptType.UPDATE_DATA, handleUpdateDept),
    takeEvery(deptType.DELETE_DATA, handleDeleteDept),
    takeEvery(empType.GET_DATA, handleGetEmployees),
    takeEvery(empType.GET_DETAIL, handleDetailEmployee),
    takeEvery(jobType.GET_SELECT_JOB, handleSelectJob),
    takeEvery(empType.ADD_DATA, handleAddEmployee),
    takeEvery(empType.DEL_DATA, handleDelEmployee),
    //Hotel
    takeEvery(HotelConstant.GET_HOTEL, handleHotel),
    takeEvery(HotelConstant.GET_HOTEL_ID, handleHotelID),
    takeEvery(HotelConstant.ADD_HOTEL, handleAddHotel),
    takeEvery(HotelConstant.UPDATE_HOTEL, handleUpdateHotel),
    takeEvery(HotelConstant.DEL_HOTEL, handleDeleteHotel),
    takeEvery(HotelConstant.GET_FACILITIES, handleFacilities),
    takeEvery(HotelConstant.GET_FACILITIES_ID, handleFacilityID),
    takeEvery(HotelConstant.ADD_FACILITIES, handleAddFacilities),
    takeEvery(HotelConstant.UPDATE_FACILITIES, handleUpdateFacilities),
    takeEvery(HotelConstant.DEL_FACILITIES, handleDeleteFacility),
    takeEvery(HotelConstant.GET_FAPHO, handleFapho),
    takeEvery(HotelConstant.ADD_FAPHO, handleAddFapho),
    takeEvery(HotelConstant.UPDATE_FAPHO, handleUpdateFapho),
    takeEvery(HotelConstant.DEL_FAPHO, handleDeleteFapho),
    takeEvery(HotelConstant.GET_FAPH, handleFaph),
    takeEvery(HotelConstant.ADD_FAPH, handleAddFaph),
    takeEvery(HotelConstant.UPDATE_FAPH, handleUpdateFaph),
    takeEvery(HotelConstant.DEL_FAPH, handleDeleteFaph),
    takeEvery(HotelConstant.GET_ADDRESS, handleAddress),
    takeEvery(HotelConstant.GET_PROVINCE, handleProvince),


    //Booking
    takeEvery(BookingConstant.GET_SPOF, handleSpof),
    takeEvery(BookingConstant.GET_BOOR, handleBoorLast),
    takeEvery(BookingConstant.INSERT_BOOKING_ORDER, handleBoorCreateFinal),
    takeEvery(BookingConstant.GET_SP_FACILITIES, handleSpFacilities),
    takeEvery(BookingConstant.GET_SP_HOTEL, handleSpHotel),
    takeEvery(BookingConstant.GET_SP_REVIEW, handleSpHotelReviews),
    takeEvery(BookingConstant.GET_SP_INVOICE, handleSpBoorInvoice)
  ]);
}
