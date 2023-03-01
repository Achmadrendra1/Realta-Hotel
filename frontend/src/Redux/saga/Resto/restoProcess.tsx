import { doRestoRequestFailed, doRestoRequestSucceed } from "@/Redux/Action/Resto/restoAction";
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { put } from "redux-saga/effects";

function* handleResto():any{
    try{
        const result = yield axios(API('Get',`/list-restaurant`,null));
        yield put(doRestoRequestSucceed(result.data))
        return result.data;
    }catch(err:any){
        yield put(doRestoRequestFailed(err))
    }
}

export {
    handleResto
}