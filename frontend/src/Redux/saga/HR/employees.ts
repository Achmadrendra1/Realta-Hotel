import { put } from "redux-saga/effects";
import axios from "axios";
import { API, FORMAPI } from "@/Redux/Configs/consumeApi";
import { empType } from "@/Redux/Constant/HR/empType";

export function* handleGetEmployees():any{
    try {
        const res = yield axios(API('get', '/employee'))
        yield put({type: empType.GET_DATA_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message)
    }
}

export function* handleDetailEmployee(action:any):any{
    const { payload } = action
    try {
        const res = yield axios(API('get', `/employee/${payload}`))
        yield put({ type: empType.GET_DETAIL_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message)
    }
}

export function* handleAddEmployee(action:any):any{
    const { payload } = action
    try {
        const res = yield axios(FORMAPI('post', '/employee', payload))
        yield put({ type: empType.ADD_DATA_SUCCESS, payload: res.data})
    } catch (e:any) {
        yield put({ type: empType.ADD_DATA_FAILED })
    }
}

export function* handleDelEmployee(action:any): any{
    const { payload } = action
    try {
        const res = yield axios(API('delete', `/employee/${payload}`))
        yield put({ type: empType.DEL_DATA_SUCCES, payload: res.data})
    } catch (e:any) {
        yield put({ type: empType.DEL_DATA_FAILED })
    }
}

export function* handleUpdateEmployee(action:any): any{
    const { payload } = action
    try {
        const res = yield axios(API('put', '/employee', payload))
        yield put({ type: empType.UPDATE_DATA_SUCCES, payload: res.data })
        yield put({ type: empType.UPDATE_DATA_DETAIL, payload: payload })
    } catch (e:any) {
        yield put({ type: empType.UPDATE_DATA_FAILED });
    }
}

export function* handleDeptHist(action:any): any{
    const { payload } = action
    try {
        const res = yield axios(API('post', '/employee/mutation', payload))
        yield put({ type: empType.ADD_MUTATION_SUCCESS, payload: res.data})
    } catch (e:any) {
        console.log(e)
        yield put({ type: empType.ADD_MUTATION_FAILED });
    }
}

export function* handleAddPayhist(action:any): any{
    const { payload } = action
    try {
        const res = yield axios(API('post', '/employee/payhist', payload))
        yield put({ type: empType.ADD_PAYHIST_SUCCESS, payload: res.data})
    } catch (e:any) {
        yield put({ type: empType.ADD_PAYHIST_FAILED });
    }
}

export function* handleUpdatePhotoEmp(action:any):any{
    const { payload } = action
    try {
        const res = yield axios(FORMAPI('put', '/employee/empfoto', payload))
        yield put({ type: empType.UPDATE_PHOTO_SUCCESS, payload: res.data })
    } catch (e:any) {
        yield put({ type: empType.UPDATE_PHOTO_FAILED })
    }
}