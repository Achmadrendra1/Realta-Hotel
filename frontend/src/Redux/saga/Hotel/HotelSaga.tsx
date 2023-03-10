import {
  addFacilityFailed,
  addFacilitySuccess,
  addFaphFailed,
  addFaphSuccess,
  addFaphoFailed,
  addFaphoSuccess,
  addHotelFailed,
  addHotelSuccess,
  deleteFacilitySucceed,
  deleteFaphFailed,
  deleteFaphSuccess,
  deleteFaphoFailed,
  deleteFaphoSuccess,
  deleteHotelFailed,
  deleteHotelSucceed,
  getAddressFailed,
  getAddressSuccess,
  getFacilityFailed,
  getFacilityIDFailed,
  getFacilityIDSuccess,
  getFacilitylSuccess,
  getFaphFailed,
  getFaphSuccess,
  getFaphoFailed,
  getFaphoSuccess,
  getHotelFailed,
  getHotelIDFailed,
  getHotelIDSuccess,
  getHotelSuccess,
  getProvinceFailed,
  getProvinceSuccess,
  updateFacilityFailed,
  updateFacilitySuccess,
  updateFaphFailed,
  updateFaphSuccess,
  updateFaphoFailed,
  updateFaphoSuccess,
  updateHotelFailed,
  updateHotelSucceed,
} from "@/Redux/Action/Hotel/HotelAction";
import { getLandingFailed, getLandingSuccess } from "@/Redux/Action/Hotel/LandingAction";
import { API, FORMAPI } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";

function* handleLanding(): any {
  try {
    const result = yield axios(API("Get",`/landing`,null))
    yield put(getLandingSuccess(result.data))
    return result.data
  } catch (error: any) {
    yield put(getLandingFailed(error))
  }
}

function* handleHotel(action:any): any {
  const { payload} = action
  try {
    const pageQueryParam = payload?.page ? `page=${payload.page}` : '';
    const keywordsQueryParam = payload?.keyword ? `&keyword=${payload.keyword}` : '';
    const result = yield axios(API("Get", `/hotels?${pageQueryParam}${keywordsQueryParam}`));
    yield put(getHotelSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getHotelFailed(e));
  }
}
function* handleHotelID(action: any): any {
  const { payload } = action;

  try {
    const result = yield axios(API("Get", `/hotels/${payload}`));
    yield put(getHotelIDSuccess(result.data[0]));
    // return result.data[0];
  } catch (e: any) {
    yield put(getHotelIDFailed(e));
  }
}

function* handleAddress(): any {
  try {
    const result = yield axios(API("Get", `/address`));
    yield put(getAddressSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getAddressFailed(e));
  }
}

function* handleProvince(): any {
  try {
    const result = yield axios(API("Get", `/provinces`));
    yield put(getProvinceSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getProvinceFailed(e));
  }
}

function* handleAddHotel(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(API("Post", `/hotels/Add`, payload));
    yield put(addHotelSuccess(result.data));
    return result.data;
  } catch (error: any) {
    yield put(addHotelFailed(error));
  }
}

function* handleUpdateHotel(action: any): any {
  const { payload } = action;
  const id = parseInt(payload.get(`hotelId`));
  try {
    const result = yield axios(API("Put", `/hotels/${id}`, payload));
    yield put(updateHotelSucceed(result.data));
    return payload;
  } catch (error) {
    yield put(updateHotelFailed(error));
  }
}

function* handleDeleteHotel(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(API("Delete", `/hotels/${payload}`));
    yield put(deleteHotelSucceed(payload));
  } catch (error) {
    yield put(deleteHotelFailed(error));
  }
}

function* handleFacilities(): any {
  try {
    const result = yield axios(API("Get", `/facilities/`, null));
    yield put(getFacilitylSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getFacilityFailed(e));
  }
}

function* handleFacilityID(action: any): any {
  const { payload } = action;

  try {
    const result = yield axios(API("Get", `/facilities/${payload}`, null));
    yield put(getFacilityIDSuccess(result.data[0]));
    return result.data[0];
  } catch (e: any) {
    yield put(getFacilityIDFailed(e));
  }
}

function* handleAddFacilities(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(API("Post", `/facilities/`, payload));
    yield put(addFacilitySuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(addFacilityFailed(error));
  }
}

function* handleUpdateFacilities(action: any): any {
  const { payload } = action;
  const id = parseInt(payload.get(`faciId`));
  try {
    const result = yield axios(API("Put", `/facilities/${id}`, payload));
    yield put(updateFacilitySuccess(result.data));
    return payload;
  } catch (error) {
    yield put(updateFacilityFailed(error));
  }
}

function* handleDeleteFacility(action: any): any {
  const { payload } = action;

  try {
    const result = yield axios(API("Delete", `/facilities/${payload}`));
    yield put(deleteFacilitySucceed(payload));
  } catch (error) {
    yield put(deleteHotelFailed(error));
  }
}

function* handleFapho(): any {
  try {
    const result = yield axios(API("Get", `/facility-photos/src`, null));
    yield put(getFaphoSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getFaphoFailed(e));
  }
}

function* handleAddFapho(action: any): any {
  const { payload } = action;
  try {
   const result = yield axios(FORMAPI("Post", `/facility-photos`, payload));
    yield put(addFaphoSuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(addFaphoFailed(error));
  }
}

function* handleUpdateFapho(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(
      API("Put", `/facility-photos/${payload}`, payload)
    );
    yield put(updateFaphoSuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(updateFaphoFailed(error));
  }
}
function* handleDeleteFapho(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(API("Delete", `/facility-photos/${payload}`));
    yield put(deleteFaphoSuccess(payload));
  } catch (error) {
    yield put(deleteFaphoFailed(error));
  }
}

function* handleFaph(): any {
  try {
    const result = yield axios(API("Get", `/facility-price-history/`, null));
    yield put(getFaphSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getFaphFailed(e));
  }
}
function* handleAddFaph(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(
      API("Post", `/facility-price-history/`, payload)
    );
    yield put(addFaphSuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(addFaphFailed(error));
  }
}
function* handleUpdateFaph(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(
      API("Put", `/facility-price-history/${payload}`, payload)
    );
    yield put(updateFaphSuccess(result.data));
    return result.data;
  } catch (error) {
    yield put(updateFaphFailed(error));
  }
}
function* handleDeleteFaph(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(
      API("Delete", `/facility-price-history/${payload}`)
    );
    yield put(deleteFaphSuccess(payload));
  } catch (error) {
    yield put(deleteFaphFailed(error));
  }
}

export {
  handleLanding,
  handleHotel,
  handleHotelID,
  handleAddHotel,
  handleUpdateHotel,
  handleDeleteHotel,
  handleFacilities,
  handleFacilityID,
  handleAddFacilities,
  handleUpdateFacilities,
  handleDeleteFacility,
  handleFapho,
  handleAddFapho,
  handleUpdateFapho,
  handleDeleteFapho,
  handleFaph,
  handleAddFaph,
  handleUpdateFaph,
  handleDeleteFaph,
  handleAddress,
  handleProvince,
};
