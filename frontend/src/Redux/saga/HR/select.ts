import { put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/Redux/Configs/consumeApi";
import { jobType } from "@/Redux/Constant/HR/jobType";

export function* handleSelectJob():any{
    try {
        const res = yield axios(API('get', '/jobrole/select'))
        yield put({ type: jobType.GET_SELECT_JOB_SUCCESS, payload: res.data})
    } catch (e:any) {
        Promise.resolve(e.message)
    }
}