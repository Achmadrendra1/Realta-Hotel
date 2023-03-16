import { all, takeEvery } from "redux-saga/effects";
import {
  handleAddDept,
  handleDeleteDept,
  handleDeptSelect,
  handleGetDept,
  handleUpdateDept,
} from "./HR/department";
import { deptType } from "../Constant/HR/deptType";
import { empType } from "../Constant/HR/empType";
import { handleAddEmployee, handleAddPayhist, handleDelEmployee, handleDeptHist, handleDetailEmployee, handleGetEmployees, handleUpdateEmployee, handleUpdatePhotoEmp } from "./HR/employees";
import UserConst from "../Constant/User/UserConst";
import { HandleLoginUser } from "./User/auth";
import { HandleCreateUser, HandleEditProfile, HandleGetUser, HandleUpdatePassword } from "./User/getUser";
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
  handleCreateTransaction,
  handleBankAllRequest,
  handleUpdatePin,
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
import LandingConstant from "../Constant/Hotel/LandingConstant";
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
  handleLanding,
  handleProvince,
  handleUpdateFacilities,
  handleUpdateFaph,
  handleUpdateFapho,
  handleUpdateHotel,
} from "./Hotel/HotelSaga";
import BookingConstant from "../Constant/Booking/BookingConstant";
import { workType } from "../Constant/HR/workType";
import { handleAddDetailWork, handleAddWork, handleDeleteWork, handleServicesList, handleUpdateWork, handleWorkDetail, handleWorkorder } from "./HR/workorder";
import { handleBoorCreateFinal, handleBoorExtra, handleBoorLast, handleBordeLast, handleSpBoorInvoice, handleSpFacilities, handleSpHotel, handleSpHotelReviews, handleSpof } from "./Booking/BookingSaga";

// Purchasing
import PurchasingConst from '../Constant/Purchasing/PurchasingConst'
import { handleStock, handleStockAdd, handleStockUpdate, handleStockDelete, handleStockCart } from './Purchasing/stockSaga'
import { handleStod, handleStodAdd, handleStodDelete, handleStodUpdate } from './Purchasing/stodSaga'
import { handleSpho, handleSphoAdd, handleSphoDelete, handleSphoUpdate } from "./Purchasing/sphoSaga";
import { handleVendor, handleVendorAdd, handleVendorDelete, handleVendorUpdate } from './Purchasing/vendorSaga'
import { handleVepro, handleVeproAdd, handleVeproDelete, handleVeproUpdate } from './Purchasing/veproSaga'
import { handlePohe, handlePoheAdd, handlePoheDelete, handlePoheUpdate } from './Purchasing/poheSaga'
import { handlePode, handlePodeAdd, handlePodeDelete, handlePodeUpdate } from './Purchasing/podeSaga'

import menuConstant from "../Constant/Resto/menuConstant";
import { handleAddMenu, handleDeleteMenu, handleMenu, handleUpdateMenu } from "./Resto/menuProcess";
import restoConstant from "../Constant/Resto/restoConstant";
import { handleResto } from "./Resto/restoProcess";
import photoConstant from "../Constant/Resto/photoConstant";
import { handleAddMenuPhoto, handleDeletePhoto, handleGetPhoto, handleUpdatePrimary } from "./Resto/menuPhotoProcess";
import orderConstant from "../Constant/Resto/orderConstant";
import numberOrderConst from "../Constant/Resto/numberOrderConstant";
import userOrderConstant from "../Constant/Resto/userOrderConstant";
import { handleAddOrder, handleOrder } from "./Resto/orderProcess";
import { handleOrderNumber } from "./Resto/orderNumberProcess";
import { handleUserOrder } from "./Resto/userOrderProcess";
import userMenuConstant from "../Constant/Resto/userMenuConstant";
import { handleUserMenu } from "./Resto/userMenuProcess";

export default function* rootSaga() {
  yield all([
    //user and auth
    takeEvery(UserConst.LOGIN_USER, HandleLoginUser),
    takeEvery(UserConst.GET_DATA_USER, HandleGetUser),
    takeEvery(UserConst.ADD_DATA_USER,HandleCreateUser),
    takeEvery(UserConst.EDIT_DATA_PROFILE,HandleEditProfile),
    takeEvery(UserConst.UPDATE_PASSWORD,HandleUpdatePassword),

    //Payment
    takeEvery(PaymentConst.GET_PAYMENT_HISTORY_DASH, handleTrxDashRequest),
    takeEvery(PaymentConst.GET_PAYMENT_GATEWAY_REQUEST, handlePagaRequest),
    takeEvery(PaymentConst.ADD_PAYMENT_GATEWAY, handlePagaCreate),
    takeEvery(PaymentConst.UPDATE_PAYMENT_GATEWAY, handlePagaUpdate),
    takeEvery(PaymentConst.DELETE_PAYMENT_GATEWAY, handlePagaDelete),
    takeEvery(PaymentConst.GET_BANK_REQUEST, handleBankRequest),
    takeEvery(PaymentConst.GET_ALL_BANK_REQUEST, handleBankAllRequest),
    takeEvery(PaymentConst.ADD_BANK, handleBankAdd),
    takeEvery(PaymentConst.UPDATE_BANK, handleUpdateBank),
    takeEvery(PaymentConst.DELETE_BANK, handleDeleteBank),
    takeEvery(PaymentConst.GET_ACCOUNT_ACTIVE, handleUsacRequest),
    takeEvery(PaymentConst.CREATE_ACCOUNT, handleUsacCreate),
    takeEvery(PaymentConst.DELETE_ACCOUNT, handleUsacDelete),
    takeEvery(PaymentConst.TOP_UP_WALLET, handleTopUp),
    takeEvery(PaymentConst.CHECK_SECURE_CODE, handleCheckSecure),
    takeEvery(PaymentConst.UPDATE_SECURE_CODE, handleUpdatePin),
    takeEvery(PaymentConst.GET_HISTORY_PAYMENT, handleGetHistoryTrx),
    takeEvery(PaymentConst.CREATE_TRANSACTION, handleCreateTransaction),

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
    takeEvery(empType.UPDATE_DATA, handleUpdateEmployee),
    takeEvery(workType.GET_WORK_ORDER, handleWorkorder),
    takeEvery(workType.GET_DETAIL, handleWorkDetail),
    takeEvery(workType.SERVICE_WORK, handleServicesList),
    takeEvery(deptType.GET_SELECT, handleDeptSelect),
    takeEvery(empType.ADD_MUTATION, handleDeptHist),
    takeEvery(empType.ADD_PAYHIST, handleAddPayhist),
    takeEvery(empType.UPDATE_PHOTO, handleUpdatePhotoEmp),
    takeEvery(workType.ADD_WORK, handleAddWork),
    takeEvery(workType.ADD_WORK_DETAIL, handleAddDetailWork),
    takeEvery(workType.DELETE_WORK_DETAIL, handleDeleteWork),
    takeEvery(workType.UPDATE_WORK_DETAIL, handleUpdateWork),

    //Hotel
    takeEvery(LandingConstant.GET_LANDING, handleLanding),
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


    // PURCHASING
    // STOCK
    takeEvery(PurchasingConst.GET_STOCKS, handleStock),
    takeEvery(PurchasingConst.GET_STOCK_CART, handleStockCart),
    takeEvery(PurchasingConst.ADD_STOCKS, handleStockAdd),
    takeEvery(PurchasingConst.EDIT_STOCKS, handleStockUpdate),
    takeEvery(PurchasingConst.DEL_STOCKS, handleStockDelete),
    // STOCK DETAIL
    takeEvery(PurchasingConst.GET_STOD, handleStod),
    takeEvery(PurchasingConst.ADD_STOD, handleStodAdd),
    takeEvery(PurchasingConst.EDIT_STOD, handleStodUpdate),
    takeEvery(PurchasingConst.DEL_STOD, handleStodDelete),
    // STOCK PHOTO
    takeEvery(PurchasingConst.GET_SPHO, handleSpho),
    takeEvery(PurchasingConst.ADD_SPHO, handleSphoAdd),
    takeEvery(PurchasingConst.EDIT_SPHO, handleSphoUpdate),
    takeEvery(PurchasingConst.DEL_SPHO, handleSphoDelete),
    // VENDOR
    takeEvery(PurchasingConst.GET_VENDOR, handleVendor),
    takeEvery(PurchasingConst.ADD_VENDOR, handleVendorAdd),
    takeEvery(PurchasingConst.EDIT_VENDOR, handleVendorUpdate),
    takeEvery(PurchasingConst.DEL_VENDOR, handleVendorDelete),
    // VENDOR PRODUCT
    takeEvery(PurchasingConst.GET_VEPRO, handleVepro),
    takeEvery(PurchasingConst.ADD_VEPRO, handleVeproAdd),
    takeEvery(PurchasingConst.EDIT_VEPRO, handleVeproUpdate),
    takeEvery(PurchasingConst.DEL_VEPRO, handleVeproDelete),
    // PURCHASE ORDER HEADER
    takeEvery(PurchasingConst.GET_POHE, handlePohe),
    takeEvery(PurchasingConst.ADD_POHE, handlePoheAdd),
    takeEvery(PurchasingConst.EDIT_POHE, handlePoheUpdate),
    takeEvery(PurchasingConst.DEL_POHE, handlePoheDelete),
    // PURCHASE ORDER DETAIL
    takeEvery(PurchasingConst.GET_PODE, handlePode),
    takeEvery(PurchasingConst.ADD_PODE, handlePodeAdd),
    takeEvery(PurchasingConst.EDIT_PODE, handlePodeUpdate),
    takeEvery(PurchasingConst.DEL_PODE, handlePodeDelete),


    //Booking
    takeEvery(BookingConstant.GET_SPOF, handleSpof),
    takeEvery(BookingConstant.GET_BOOR, handleBoorLast),
    takeEvery(BookingConstant.INSERT_BOOKING_ORDER, handleBoorCreateFinal),
    takeEvery(BookingConstant.GET_SP_FACILITIES, handleSpFacilities),
    takeEvery(BookingConstant.GET_SP_HOTEL, handleSpHotel),
    takeEvery(BookingConstant.GET_SP_REVIEW, handleSpHotelReviews),
    takeEvery(BookingConstant.GET_SP_INVOICE, handleSpBoorInvoice),
    takeEvery(BookingConstant.INSERT_BOOKING_EXTRA, handleBoorExtra),
    takeEvery(BookingConstant.GET_BORDE, handleBordeLast),

    //Resto
    takeEvery(menuConstant.GET_MENUS, handleMenu),
    takeEvery(menuConstant.UPDATE_MENU, handleUpdateMenu),
    takeEvery(menuConstant.ADD_MENU, handleAddMenu),
    takeEvery(menuConstant.DELETE_MENU, handleDeleteMenu),
    takeEvery(restoConstant.GET_RESTOS, handleResto),
    takeEvery(photoConstant.DELETE_PHOTO, handleDeletePhoto),
    takeEvery(photoConstant.GET_PHOTO, handleGetPhoto),
    takeEvery(photoConstant.UPDATE_PRIMARY, handleUpdatePrimary),
    takeEvery(photoConstant.ADD_PHOTO, handleAddMenuPhoto),
    takeEvery(orderConstant.GET_ORDERS, handleOrder),
    takeEvery(orderConstant.ADD_ORDERS, handleAddOrder),
    takeEvery(numberOrderConst.GET_NUMBER_ORDER, handleOrderNumber),
    takeEvery(userOrderConstant.GET_ORDER_COMPLETE, handleUserOrder),
    takeEvery(userMenuConstant.GET_MENU_USER, handleUserMenu),

  ]); 
}
