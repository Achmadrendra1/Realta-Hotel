import { put, call } from "redux-saga/effects";
import axios from "axios";
import { API } from "../../Configs/consumeApi";
import UserConst from "../../Constant/User/UserConst";

export function* HandleLoginUser(action: any): any {
try {
    const result = yield axios(API("Post", "/auth", action.payload));
    localStorage.setItem("token", result.data.token);
    //cek hasil jwt verify
    // console.log(result.data.data);
    yield put({ type: UserConst.LOGIN_USER_SUCCESS, payload: result.data });
  } 
catch (e: any) {
    const delay = (time: any) =>
    new Promise((resolve) => setTimeout(resolve, time));
    yield put({
    type: UserConst.LOGIN_USER_FAILED,
    payload: e.response.data.message,
    });
    yield call(delay, 4000);
    yield put({ type: UserConst.LOGIN_USER_FAILED, payload: null });
  }
}


