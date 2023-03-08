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
    getSpInvoiceFailed
} from "@/Redux/Action/Booking/BookingAction"
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects"

function* handleSpof(): any {
    try {
        const result = yield axios(API('Get', `/special-offers/all`, null))
        yield put(getSpofSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getSpofFailed(e))
    }
}

function* handleBoorLast(): any {
    try {
        const result = yield axios (API('Get', `/booking-orders/last`, null))
        yield put(getBoorSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getBoorFailed(e))
    }
}

function* handleBoorCreateFinal(action : any): any {
  try {
    const res = yield axios (API('Post', `/booking-orders/create/final`, action.payload))
        yield put(insertBookingSuccess(res.data.result))
        return res.data.result
        console.log(action.payload)
        
    }catch(e : any){
        yield put(insertBookingFailed(e))
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
      const result = yield axios(API('Get', '/booking-orders/Faci', null));
      yield put(getSpFacilitiesSuccess(result.data));
      return result.data
    }catch(e : any) {
      yield put(getSpHotelFailed(e))
    }
  }

  function* handleSpHotelReviews() : any {
    try{
      const result = yield axios(API('Get', '/booking-orders/Review', null));
      yield put(getSpReviewSuccess(result.data));
      return result.data
    }catch(e : any) {
      yield put(getSpReviewFailed(e))
    }
  }
  
  function* handleSpBoorInvoice () : any {
    try{
      const result = yield axios (API('Get', '/booking-orders/invoice', null))
      yield put(getSpInvoiceSuccess(result.data))
      return result.data
    }catch(e : any) {
      yield put (getSpInvoiceFailed(e))
    }
  }



export {
    handleSpof,
    handleBoorLast,
    handleBoorCreateFinal,
    handleSpFacilities,
    handleSpHotel,
    handleSpHotelReviews,
    handleSpBoorInvoice
}