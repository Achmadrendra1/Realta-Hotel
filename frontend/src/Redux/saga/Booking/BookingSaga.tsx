import {
    getSpof,
    getSpofSuccess,
    getSpofFailed,
    getBoorSuccess,
    getBoorFailed,
    insertBookingSuccess,
    insertBookingFailed,
    getSpFacilitiesSuccess,
    getSpHotelFailed,
    getSpHotelSuccess,
    getSpReviewSuccess,
    getSpReviewFailed,
    getSpInvoice,
    getSpInvoiceSuccess,
    getSpInvoiceFailed,
    insertBookingExtraSuccess,
    insertBookingExtraFailed,
    getBordeSuccess,
    getBordeFailed
} from "@/Redux/Action/Booking/BookingAction"
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects"

function* handleSpof(): any {
    try {
        const result = yield axios(API('Get', `/special-offers/all`))
        yield put(getSpofSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getSpofFailed(e))
    }
}

function* handleBoorLast(): any {
    try {
        const result = yield axios (API('Get', `/booking-orders/last`))
        yield put(getBoorSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getBoorFailed(e))
    }
}

function* handleBordeLast() : any {
  try {
    const result = yield axios (API('Get', `/booking-order-detail/last`))
    yield put(getBordeSuccess(result.data))
    return result.data
  }catch (e : any) {
    yield put(getBordeFailed(e))
  }
}

function* handleBoorCreateFinal(action : any): any {
  try {
    const result = yield axios (API('Post', `/booking-orders/create/final`, action.payload))
        yield put(insertBookingSuccess(result.data.return))
        return result.data.return        
    }catch(e : any){
        yield put(insertBookingFailed(e))
    }
}

function* handleBoorExtra(action : any) : any {
  try {
    const result = yield axios (API('Post', `/booking-order-detail-extra/createArray`, action.payload))
    yield put(insertBookingExtraSuccess(result.data.return))
    return result.data.return
  }catch(e : any){
    yield put(insertBookingExtraFailed(e))
  }
}

function* handleSpHotel() : any {
    try{
      const result = yield axios(API('Get', `/booking-orders/hotel`));
      yield put(getSpHotelSuccess(result.data));
      return result.data
    }catch(e : any) {
      yield put(getSpHotelFailed(e))
    }
  }

function* handleSpFacilities() : any {
    try{
      const result = yield axios(API('Get', '/booking-orders/Faci'));
      yield put(getSpFacilitiesSuccess(result.data));
      return result.data
    }catch(e : any) {
      yield put(getSpHotelFailed(e))
    }
  }

  function* handleSpHotelReviews() : any {
    try{
      const result = yield axios(API('Get', '/booking-orders/Review'));
      yield put(getSpReviewSuccess(result.data));
      return result.data
    }catch(e : any) {
      yield put(getSpReviewFailed(e))
    }
  }
  
  function* handleSpBoorInvoice () : any {
    try{
      const result = yield axios (API('Get', '/booking-orders/invoice'))
      yield put(getSpInvoiceSuccess(result.data))
      return result.data
    }catch(e : any) {
      yield put (getSpInvoiceFailed(e))
    }
  }

export {
    handleSpof,
    handleBoorLast,
    handleBordeLast,
    handleBoorCreateFinal,
    handleSpFacilities,
    handleSpHotel,
    handleSpHotelReviews,
    handleSpBoorInvoice,
    handleBoorExtra
}