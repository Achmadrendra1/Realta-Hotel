import { doOrderNumberFailed, doOrderNumberSucceed } from "@/Redux/Action/Resto/numberOrderAction";
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects";

function* handleOrderNumber():any{
    try{
        const result = yield axios(API('GET', '/order-menus/desc'));
        yield put(doOrderNumberSucceed(result.data)); 
    }catch(err:any){
        yield put(doOrderNumberFailed(err));
    }
}

export {
    handleOrderNumber
}