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

function* handlePode(): any {
    try {
        const result = yield axios(API('GET', '/purchase-order-detail'))
        yield put(AllPodeSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllPodeFailed(error))
    }
}

function* handlePodeAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/purchase-order-detail', action.payload))
        yield put(AddPodeSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddPodeFailed(error.response.data.message))
    }
}

function* handlePodeUpdate(action: any): any {
    try {
        yield axios(API('PUT', '/purchase-order-detail/' + action.payload.podeId, action.payload))
        yield put(EditPodeSuccess(action.payload))
    } catch (error: any) {
        yield put(EditPodeFailed(error.response.data.message))
    }
}

function* handlePodeDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/purchase-order-detail/${action.payload}`))
        yield put(DelPodeSuccess(action.payload))
    } catch (error) {
        yield put(DelPodeFailed(error))
    }
}

export {
    handlePode,
    handlePodeAdd,
    handlePodeUpdate,
    handlePodeDelete
}
