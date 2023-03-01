import { doGetUserOrderFailed, doGetUserOrderSucceed } from "@/Redux/Action/Resto/userOrderAction";
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects";

function* handleUserOrder(action:any):any{
    try{
        console.log('action di process', action);
        // debugger;
        const result = yield axios(API('Post', '/order-menus/order', action.payload))
        console.log(result,'user order process');
        yield put(doGetUserOrderSucceed(result.data))
        return result.data;
    }catch(err:any){
        yield put(doGetUserOrderFailed(err))
    }
}

export { handleUserOrder }