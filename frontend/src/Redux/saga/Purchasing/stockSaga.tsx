import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "@/Redux/Configs/consumeApi";
import {
    AllStockSuccess,
    AllStockFailed,
    AddStockSuccess,
    AddStockFailed,
    EditStockSuccess,
    EditStockFailed,
    DelStockSuccess,
    DelStockFailed
} from '@/Redux/Action/Purchasing/purchasingAction';

function* handleStock(): any {
    try {
        const result = yield axios(API('GET', '/stock'))
        yield put(AllStockSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllStockFailed(error))
    }
}

function* handleStockAdd(action: any): any {
    try {
        const res = yield axios(API('POST', '/stock', action.payload))
        yield put(AddStockSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddStockFailed(error.response.data.message))
    }
}

function* handleStockUpdate(action: any): any {
    try {
        yield axios(API('PUT', '/stock/' + action.payload.stockId, action.payload))
        yield put(EditStockSuccess(action.payload))
    } catch (error: any) {
        yield put(EditStockFailed(error.response.data.message))
    }
}

function* handleStockDelete(action: any): any {
    try {
        yield axios(API(`DELETE`, `/stock/${action.payload}`))
        yield put(DelStockSuccess(action.payload))
    } catch (error) {
        yield put(DelStockFailed(error))
    }
}

export {
    handleStock,
    handleStockAdd,
    handleStockUpdate,
    handleStockDelete
}