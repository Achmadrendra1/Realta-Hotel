import { put } from "redux-saga/effects";
import axios from "axios";
import { API, FORMAPI } from "@/Redux/Configs/consumeApi";
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
    const { payload } = action
    try {
        const res = yield axios(API('get', '/workorder/'+ payload))
        yield put({ type: workType.GET_DETAIL_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e)
    }
}

export function* handleServicesList():any{
    try {
        const res = yield axios(API('get', '/workorder/task'))
        console.log(res.data)
        yield put({ type: workType.SERVICE_WORK_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e)
        yield put({ type: workType.SERVICE_WORK_FAILED })
    }
}

export function* handleAddWork(action:any):any{
    const { payload } = action
    try {
        const res = yield axios(API('post', '/workorder', payload))
        yield put({ type: workType.ADD_WORK_SUCCESS, payload: res.data })
    } catch (e:any) {
        yield put({ type: workType.ADD_WORK_FAILED })
    }
}

export function* handleAddDetailWork(action:any):any{
    const { payload } = action
    try {
        const res = yield axios(API('post', '/workorder/details', payload))
        yield put({ type: workType.ADD_WORK_DETAIL_SUCCESS, payload: res.data})
    } catch (e:any) {
        yield put({ type: workType.ADD_WORK_DETAIL_FAILED })
    }
}

export function* handleDeleteWork(action:any):any {
    const { payload } = action
    try {
        yield axios(API('delete', '/workorder/del/' + payload))
        yield put({ type: workType.DELETE_WORK_DETAIL_SUCCESS, payload: payload })
    } catch (e:any) {
        yield put({ type: workType.DELETE_WORK_DETAIL_FAILED })
    }
}

export function* handleUpdateWork(action:any):any {
    const { payload } = action
    try {
        const res = yield axios(API('put', '/workorder/', payload))
        yield put({ type: workType.UPDATE_WORK_DETAIL_SUCCESS, payload: res.data })
    } catch (e:any) {
        yield put({ type: workType.UPDATE_WORK_DETAIL_FAILED })
    }
}