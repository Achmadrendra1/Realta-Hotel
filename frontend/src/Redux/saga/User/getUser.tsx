import { doAddDataUserFailed, doAddDataUserSuccess, doGetDataFailed, doGetDataSuccess, doUpdateFailed, doUpdatePasswordFailed, doUpdatePasswordSuccess, doUpdateSuccess } from "@/Redux/Action/User/GetDataUser";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { API } from "../../Configs/consumeApi";


export function* HandleGetUser():any {
    try {
        const token = localStorage.getItem('token')
        const result = yield axios(API('GET',"/auth/"+token));
        // console.log(result.data.users);
        yield put (doGetDataSuccess(result.data.users))
    } catch (error) {
        // console.log(error)
        yield put(doGetDataFailed(error))
    }
}

export function* HandleCreateUser(action:any):any {
    try {
       const result=  yield axios(API('POST',"/users/",action.payload ));
        console.log(result.data.users);
        yield put (doAddDataUserSuccess(result.data.users))
    } catch (error : any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddDataUserFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doAddDataUserFailed(null))
    }
}

export function* HandleEditProfile(action:any):any{
    try {
      const result = yield axios (API("PUT","/users/"+ action.payload.user_id, action.payload))
    //   console.log(result);
        yield put (doUpdateSuccess(action.payload))
    } catch (error :any) {
        // yield put (doUpdateFailed(error))
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
      yield put(doUpdateFailed(error.response.data.message));
      yield call(delay, 6000);
      yield put(doUpdateFailed(null));
    }
}

export function* HandleUpdatePassword(action:any):any{
    try {
         const result = yield axios (API("PUT","/password/"+ action.payload.uspa_user_id, action.payload))
        // console.log(action.payload.user_id);
          yield put (doUpdatePasswordSuccess(action.payload))
      } catch (error :any) {
          // yield put (doUpdateFailed(error))
          const delay = (time: any) =>
          new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdatePasswordFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdatePasswordFailed(null));
      }
}