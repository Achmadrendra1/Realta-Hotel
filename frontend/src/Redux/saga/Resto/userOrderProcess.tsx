import { doGetUserOrderFailed, doGetUserOrderSucceed } from "@/Redux/Action/Resto/userOrderAction";
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects";

function* handleUserOrder(action:any):any{
    try{ 
        // debugger;
        const result = yield axios(API('Post', '/order-menus/order', {orderNumber : action.payload}))
        yield put(doGetUserOrderSucceed(result.data)) 
    }catch(err:any){
        yield put(doGetUserOrderFailed(err))
    }
}

export { handleUserOrder }