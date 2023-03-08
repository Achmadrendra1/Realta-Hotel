import { doUserMenuReqFaild, doUserMenuReqSucceed } from "@/Redux/Action/Resto/userMenuAction";
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { put } from "redux-saga/effects";

function* handleUserMenu(action:any):any{
    // console.warn(action.payload,'di process');
    // debugger;
    try{
        // let result = yield axios.get(`http://localhost:3500/resto-menus/list/${action.payload}`,  {
        //     headers:{
        //         'Content-Type': 'application/json',
        //     }
        // });
        // console.warn(result.data,'result process');
        
        const result = yield axios(API('Post','/resto-menus/user/'+action.payload.faci_id, action.payload))
        yield put(doUserMenuReqSucceed(result.data))
        return result.data;
    }catch(err:any){
        yield put(doUserMenuReqFaild(err))
    }
}

export{  
    handleUserMenu
};