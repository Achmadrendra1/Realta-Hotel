import { doAddOrderFailed, doAddOrderSucceed, doOrderFailed, doOrderSucceed } from "@/Redux/Action/Resto/orderAction";
import { API } from "@/Redux/Configs/consumeApi"
import axios from "axios";
import { put } from "redux-saga/effects";

function* handleOrder():any{
    try{
        const result = yield axios(API('Get','/order-menus'))
        yield put(doOrderSucceed(result.data));
        return result.data;
    }catch(err:any){
        yield put(doOrderFailed(err));
    }
}

function* handleAddOrder(action:any):any{
    try{
        // debugger;
        console.warn(action.payload, 'order process');
        
        const result = yield axios(API('Post','/order-menus/add',action.payload));
        console.log(result, 'isi result di addorder process');
        
        yield put(doAddOrderSucceed(result.data));
        return result.data;
    }catch(err:any){
        yield put(doAddOrderFailed(err))
    }
}

export {
    handleAddOrder,
    handleOrder
}