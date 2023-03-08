import { doAddMenuFailed, doAddMenuSucceed, doDeleteMenuFailed, doDeleteMenuSucceed, doMenuRequestFailed, doMenuRequestSucceed, doUpdateMenuSucceed } from "@/Redux/Action/Resto/restoMenuAction"
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";


function* handleMenu(action:any):any{
    try{
        // console.log('masuk menu saga');
        const result = yield axios(API('Post',`/resto-menus/menu-dashboard`,action.payload))
        // console.log(result.data)
        yield put(doMenuRequestSucceed(result.data))
        return result.data;
    }catch(e:any){
        yield put(doMenuRequestFailed(e))
    }
}

function* handleUpdateMenu(action:any):any{
    try{
        // console.log(action.payload.remeId, 'ini isi handle update menu');
        // debugger;
        const result = yield axios(API('Put',`/resto-menus/${action.payload.remeId}`,action.payload))
        yield put(doUpdateMenuSucceed(result.data))
        return result.data;
    }catch(err:any){
        yield put(doMenuRequestFailed(err))
    }
}

function* handleAddMenu(action:any):any{
    try{
        console.log(action.payload,'di process add');
        debugger;
        const result = yield axios(API('Post',`/resto-menus`,action.payload))
        yield put(doAddMenuSucceed(result.data))
        return result.data
    }catch(err){
        yield put(doAddMenuFailed(err))
    }
}

function* handleDeleteMenu(action:any):any{
    // action.payload cuma nerima idnya aja ok
    // debugger;
    const id = Number(action.payload)

    // ada masalah disini
    try{
        // console.log('di process ',action.payload)
        yield axios(API('delete','/resto-menus/'+id,action.payload))
        // console.log('ini result: ', result);
        yield put(doDeleteMenuSucceed(action.payload))
        // return action.payload;
    }catch(err:any){
        yield put(doDeleteMenuFailed(err))
    }
}

export {
    handleMenu,
    handleUpdateMenu,
    handleAddMenu,
    handleDeleteMenu
}