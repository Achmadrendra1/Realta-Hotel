import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllVeproSuccess,
    AllVeproFailed,
    AddVeproSuccess,
    AddVeproFailed,
    EditVeproSuccess,
    EditVeproFailed,
    DelVeproSuccess,
    DelVeproFailed
} from '@/Redux/Action/Purchasing/purchasingAction';

export function* handleVepro(): any {
    try {
        const result = yield axios(API('GET', '/vendor-product'))
        yield put(AllVeproSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllVeproFailed(error))
    }
}

export function* handleVeproAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/vendor-product', action.payload))
        yield put(AddVeproSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddVeproFailed(error.response.data.message))
    }
}

export function* handleVeproUpdate(action: any): any {
    try {
        const res = yield axios(API('put', `/vendor-product/` + action.payload.vestock_id, action.payload))
        yield put(EditVeproSuccess(action.payload))
        return res.data.result
    } catch (error: any) {
        yield put(EditVeproFailed(error.response.data.message))
    }
}

export function* handleVeproDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/vendor-product/${action.payload}`))
        yield put(DelVeproSuccess(action.payload))
    } catch (error) {
        yield put(DelVeproFailed(error))
    }
}