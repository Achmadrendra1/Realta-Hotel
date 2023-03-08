import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllVendorSuccess,
    AllVendorFailed,
    AddVendorSuccess,
    AddVendorFailed,
    EditVendorSuccess,
    EditVendorFailed,
    DelVendorSuccess,
    DelVendorFailed
} from '@/Redux/Action/Purchasing/purchasingAction';

export function* handleVendor(): any {
    try {
        const result = yield axios(API('GET', '/vendor'))
        yield put(AllVendorSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllVendorFailed(error))
    }
}

export function* handleVendorAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/vendor', action.payload))
        yield put(AddVendorSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddVendorFailed(error.response.data.message))
    }
}

export function* handleVendorUpdate(action: any): any {
    try {
        const res = yield axios(API('PUT', '/vendor/' + action.payload.vendorId, action.payload))
        yield put(EditVendorSuccess(action.payload))
        return res.data.result
    } catch (error: any) {
        yield put(EditVendorFailed(error.response.data.message))
    }
}

export function* handleVendorDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/vendor/${action.payload}`))
        yield put(DelVendorSuccess(action.payload))
    } catch (error) {
        yield put(DelVendorFailed(error))
    }
}