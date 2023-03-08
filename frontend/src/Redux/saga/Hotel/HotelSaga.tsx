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
import { API, FORMAPI } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";

function* handleHotel(): any {
  try {
    const result = yield axios(API("Get", `/hotels`, null));
    yield put(getHotelSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getHotelFailed(e));
  }
}
function* handleHotelID(action: any): any {
  const { payload } = action;

  try {
    const result = yield axios(API("Get", `/hotels/${payload}`, null));
    yield put(getHotelIDSuccess(result.data[0]));
    return result.data[0];
  } catch (e: any) {
    yield put(getHotelIDFailed(e));
  }
}

function* handleAddress(): any {
  try {
    const result = yield axios(API("Get", `/address`, null));
    yield put(getAddressSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getAddressFailed(e));
  }
}

function* handleProvince(): any {
  try {
    const result = yield axios(API("Get", `/provinces`, null));
    yield put(getProvinceSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getProvinceFailed(e));
  }
}

function* handleAddHotel(action: any): any {
  const { payload } = action;
  try {
    const hotel = yield axios(API("Post", `/hotels/Add`, payload));
    yield put(addHotelSuccess(hotel.data));
  } catch (error: any) {
    yield put(addHotelFailed(error));
  }
}

function* handleUpdateHotel(action: any): any {
  const { payload } = action;
  const id = parseInt(payload.get(`hotelId`));
  // console.log(id);

  try {
    const result = yield axios(API("Put", `/hotels/${id}`, payload));
    yield put(updateHotelSucceed(result.data));
    // console.log(result.data);

    return result.data;
  } catch (error) {
    yield put(updateHotelFailed(error));
  }
}

function* handleDeleteHotel(action: any): any {
  const { payload } = action;
  // console.log(payload);

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
    // console.log(result.data);

    return result.data[0];
  } catch (e: any) {
    yield put(getFacilityIDFailed(e));
  }
}

function* handleAddFacilities(action: any): any {
  const { payload } = action;
  try {
    const result = yield axios(API("Post", `/facilities/Add`, payload));
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
    return result.data;
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
    const result = yield axios(API("Get", `/facility-photos/`, null));
    yield put(getFaphoSuccess(result.data));
    return result.data;
  } catch (e: any) {
    yield put(getFaphoFailed(e));
  }
}

function* handleAddFapho(action: any): any {
  const { payload } = action;
  const id = payload.get(`faphoUrl`);
  try {
    const result = yield axios(FORMAPI("Post", `/facility-photos/`, payload));
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
