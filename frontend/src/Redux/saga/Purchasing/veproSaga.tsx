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

function* handleVepro(): any {
    try {
        const result = yield axios(API('GET', '/vendor-product'))
        yield put(AllVeproSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllVeproFailed(error))
    }
}

function* handleVeproAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/vendor-product' + action.payload))
        yield put(AddVeproSuccess(res.data.result))
        return res.data.result
    } catch (error) {
        yield put(AddVeproFailed(error))
    }
}

function* handleVeproUpdate(action: any): any {
    try {
        yield axios(API('PUT', '/vendor-product/' + action.payload.veproId, action.payload))
        yield put(EditVeproSuccess(action.payload))
    } catch (error) {
        yield put(EditVeproFailed(error))
    }
}

function* handleVeproDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/vendor-product/${action.payload}`))
        yield put(DelVeproSuccess(action.payload))
    } catch (error) {
        yield put(DelVeproFailed(error))
    }
}

export {
    handleVepro,
    handleVeproAdd,
    handleVeproUpdate,
    handleVeproDelete
}