import { put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/Redux/Configs/consumeApi";
import { workType } from "@/Redux/Constant/HR/workType";

export function* handleWorkorder():any{
    try {
        const res = yield axios(API('get', '/workorder'))
        yield put({ type: workType.GET_WORK_ORDER_SUCCESS, payload: res.data })
    } catch (e:any) {
        Promise.resolve(e)
    }
}

export function* handleWorkDetail(action:any):any{
    try {
        const res = yield axios(API('get', '/workorder/'+ action.payload))
        yield put({ type: workType.GET_DETAIL_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e)
    }
}

export function* handleServicesList():any{
    try {
        const res = yield axios(API('get', '/workorder/task'))
        yield put({ type: workType.SERVICE_WORK_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e)
        yield put({ type: workType.SERVICE_WORK_FAILED })
    }
}