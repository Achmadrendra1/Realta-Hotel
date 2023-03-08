import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllStodSuccess,
    AllStodFailed,
    AddStodSuccess,
    AddStodFailed,
    EditStodSuccess,
    EditStodFailed,
    DelStodSuccess,
    DelStodFailed
} from '@/Redux/Action/Purchasing/purchasingAction';

export function* handleStod(): any {
    try {
        const result = yield axios(API('GET', '/stock-detail'))
        yield put(AllStodSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllStodFailed(error))
    }
}

export function* handleStodAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/stock-detail', action.payload))
        yield put(AddStodSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddStodFailed(error.response.data.message))
    }
}

export function* handleStodUpdate(action: any): any {
    try {
        const res = yield axios(API('PUT', `/stock-detail/` + action.payload.stockdet_id, action.payload))
        yield put(EditStodSuccess(action.payload))
        return res.data.result
    } catch (error: any) {
        yield put(EditStodFailed(error.response.data.message))
    }
}

export function* handleStodDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/stock-detail/${action.payload}`))
        yield put(DelStodSuccess(action.payload))
    } catch (error) {
        yield put(DelStodFailed(error))
    }
}