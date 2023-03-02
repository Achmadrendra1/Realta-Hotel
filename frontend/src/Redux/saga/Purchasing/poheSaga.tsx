import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllPoheSuccess,
    AllPoheFailed,
    AddPoheSuccess,
    AddPoheFailed,
    EditPoheSuccess,
    EditPoheFailed,
    DelPoheSuccess,
    DelPoheFailed
} from "@/Redux/Action/Purchasing/purchasingAction";

function* handlePohe(): any {
    try {
        const result = yield axios(API('GET', '/purchase-order-header'))
        yield put(AllPoheSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllPoheFailed(error))
    }
}

function* handlePoheAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/purchase-order-header', action.payload))
        yield put(AddPoheSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddPoheFailed(error.response.data.message))
    }
}

function* handlePoheUpdate(action: any): any {
    try {
        yield axios(API('PUT', '/purchase-order-header/' + action.payload.poheId, action.payload))
        yield put(EditPoheSuccess(action.payload))
    } catch (error: any) {
        yield put(EditPoheFailed(error.response.data.message))
    }
}

function* handlePoheDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/purchase-order-header/${action.payload}`))
        yield put(DelPoheSuccess(action.payload))
    } catch (error) {
        yield put(DelPoheFailed(error))
    }
}

export {
    handlePohe,
    handlePoheAdd,
    handlePoheUpdate,
    handlePoheDelete
}