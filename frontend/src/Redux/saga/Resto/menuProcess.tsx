import { doAddMenuFailed, doAddMenuSucceed, doDeleteMenuFailed, doDeleteMenuSucceed, doMenuRequestFailed, doMenuRequestSucceed, doUpdateMenuSucceed } from "@/Redux/Action/Resto/restoMenuAction"
import { API } from "@/Redux/Configs/consumeApi";
import axios from "axios";
import { call, put } from "redux-saga/effects";


function* handleMenu(action:any):any{
    try{ 
        const result = yield axios(API('Post',`/resto-menus/menu-dashboard`,action.payload)) 
        yield put(doMenuRequestSucceed(result.data)) 
    }catch(e:any){
        yield put(doMenuRequestFailed(e))
    }
}

function* handleUpdateMenu(action:any):any{
    try{ 
        // debugger;
        const result = yield axios(API('Put',`/resto-menus/${action.payload.remeId}`,action.payload))
        yield put(doUpdateMenuSucceed(result.data)) 
    }catch(err:any){
        yield put(doMenuRequestFailed(err))
    }
}

function* handleAddMenu(action:any):any{
    try{ 
        // debugger;
        const result = yield axios(API('Post',`/resto-menus`,action.payload))
        yield put(doAddMenuSucceed(result.data)) 
    }catch(err){
        yield put(doAddMenuFailed(err))
    }
}

function* handleDeleteMenu(action:any):any{ 
    // debugger;
    const id = Number(action.payload)
 
    try{ 
        yield axios(API('delete','/resto-menus/'+id,action.payload)) 
        yield put(doDeleteMenuSucceed(action.payload)) 
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