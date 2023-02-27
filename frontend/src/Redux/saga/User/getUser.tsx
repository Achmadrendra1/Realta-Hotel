import { doGetDataFailed, doGetDataSuccess } from "@/Redux/Action/User/GetDataUser";
import axios from "axios";
import { put } from "redux-saga/effects";
import { API } from "../../Configs/consumeApi";


export function* HandleGetUser():any {
    try {
        const token = localStorage.getItem('token')
        const result = yield axios(API('GET',"/auth/"+token));
        console.log(result.data.users[0]);
        yield put (doGetDataSuccess(result.data.users))
    } catch (error) {
        console.log(error)
        // yield put(doGetDataFailed(error.response.da))
    }
}