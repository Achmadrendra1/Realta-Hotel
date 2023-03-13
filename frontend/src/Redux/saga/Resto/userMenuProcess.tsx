import { doUserMenuReqFaild, doUserMenuReqSucceed } from "@/Redux/Action/Resto/userMenuAction";
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { put } from "redux-saga/effects";

function* handleUserMenu(action:any):any{
    // debugger;
    try{
        const result = yield axios(API('Post','/resto-menus/user/'+action.payload.faci_id, action.payload)) 
        yield put(doUserMenuReqSucceed(result.data)) 
    }catch(err:any){
        yield put(doUserMenuReqFaild(err))
    }
}

export{  
    handleUserMenu
};