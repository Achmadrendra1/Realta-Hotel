import axios from "axios";
import { put } from "redux-saga/effects";
import { API, FORMAPI } from "@/Redux/Configs/consumeApi";
import {
    AllSphoSuccess,
    AllSphoFailed,
    AddSphoSuccess,
    AddSphoFailed,
    EditSphoSuccess,
    EditSphoFailed,
    DelSphoSuccess,
    DelSphoFailed
} from '@/Redux/Action/Purchasing/purchasingAction';

export function* handleSpho(): any {
    try {
        const result = yield axios(API('GET', '/stock-photo'))
        yield put(AllSphoSuccess(result.data))
        return result.data
    } catch (error) {
        yield put(AllSphoFailed(error))
    }
}

export function* handleSphoAdd(action: any): any {
    try {
        const res = yield axios(FORMAPI('POST', '/stock-photo', action.payload))
        yield put(AddSphoSuccess(res.data.result))
        return res.data.result
    } catch (error: any) {
        yield put(AddSphoFailed(error.response.data.message))
    }
}

export function* handleSphoUpdate(action: any): any {
    try {
        const res = yield axios(FORMAPI('PUT', '/stock-photo/' + action.payload.sphoId, action.payload))
        yield put(EditSphoSuccess(action.payload))
        return res.data.result
    } catch (error: any) {
        yield put(EditSphoFailed(error.response.data.message))
    }
}

export function* handleSphoDelete(action: any): any {
    try {
        yield axios(FORMAPI(`DELETE`, `/stock-photo/${action.payload}`))
        yield put(DelSphoSuccess(action.payload))
    } catch (error) {
        yield put(DelSphoFailed(error))
    }
}