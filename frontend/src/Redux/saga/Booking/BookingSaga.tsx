import {
    getSpof,
    getSpofSuccess,
    getSpofFailed,
    getBoorSuccess,
    getBoorFailed,
    insertBookingSuccess,
    insertBookingFailed
} from "@/Redux/Action/Booking/BookingAction"
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects"

function* handleSpof(): any {
    try {
        const result = yield axios(API('Get', `/specialoffers/all`, null))
        yield put(getSpofSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getSpofFailed(e))
    }
}

function* handleBoorLast(): any {
    try {
        const result = yield axios (API('Get', `/bookingorders/last`, null))
        yield put(getBoorSuccess(result.data))
        return result.data
    }catch (e : any) {
        yield put(getBoorFailed(e))
    }
}

function* handleBoorCreateFinal(action : any): any {
    try {
        const res = yield axios (API('Post', `/bookingorders/create/final`, action.payload))
        yield put(insertBookingSuccess(res.data.result))
        return res.data.result
        // console.log(res)
        
    }catch(e : any){
        yield put(insertBookingFailed(e))
    }
}

export {
    handleSpof,
    handleBoorLast,
    handleBoorCreateFinal
}