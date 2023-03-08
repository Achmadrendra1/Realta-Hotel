import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllPodeSuccess,
    AllPodeFailed,
    AddPodeSuccess,
    AddPodeFailed,
    EditPodeSuccess,
    EditPodeFailed,
    DelPodeSuccess,
    DelPodeFailed
} from "@/Redux/Action/Purchasing/purchasingAction";

export function* handlePode(): any {
    try {
        const result = yield axios(API('GET', '/purchase-order-detail'))
        yield put(AllPodeSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllPodeFailed(error))
    }
}

export function* handlePodeAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/purchase-order-detail', action.payload))
        yield put(AddPodeSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddPodeFailed(error.response.data.message))
    }
}

export function* handlePodeUpdate(action: any): any {
    try {
        const res = yield axios(API('put', '/purchase-order-detail/' + action.payload.podhe_id, action.payload))
        yield put(EditPodeSuccess(action.payload))
        return res.data.result
    } catch (error: any) {
        yield put(EditPodeFailed(error.response.data.message))
    }
}

export function* handlePodeDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/purchase-order-detail/${action.payload}`))
        yield put(DelPodeSuccess(action.payload))
    } catch (error) {
        yield put(DelPodeFailed(error))
    }
}