import { put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/Redux/Configs/consumeApi";
import { deptType } from "@/Redux/Constant/HR/deptType";

export function* handleGetDept():any{
    try {
        const res:any = yield axios(API('get', '/dept'));
        yield put({ type: deptType.GET_DATA_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message);
    }
}

export function* handleAddDept( action:any ):any{
    const { payload } = action
    try {
        const res:any = yield axios(API('post', '/dept', payload))
        yield put({ type: deptType.ADD_DATA_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message);
    }
}

export function* handleUpdateDept( action:any ):any{
    const { payload } = action
    try {
        const res:any = yield axios(API('put', `/dept/${payload.id}`, {"name" : payload.name}))
        yield put({ type: deptType.UPDATE_DATA_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message)
    }
}

export function* handleDeleteDept( action:any ):any{
    const { payload } = action
    try {
        yield axios(API('delete', `/dept/${payload}`))
        yield put({ type: deptType.DELETE_DATA_SUCCESS, payload: payload})
    } catch (e:any) {
        Promise.resolve(e.message)
    }
}

export function* handleDeptSelect():any{
    try {
        const res = yield axios(API('get', `/dept/select`))
        yield put({ type: deptType.GET_SELECT_SUCCESS, payload: res.data})
    } catch (e:any) {
        yield put({ type: deptType.GET_SELECT_FAILED})
    }
}