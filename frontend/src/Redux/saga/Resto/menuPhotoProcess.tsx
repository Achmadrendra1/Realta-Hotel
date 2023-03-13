import { doAddPhotoFailed, doAddPhotoSucceed, doDeletePhotoFailed, doGetPhotoFailed, doGetPhotoSucceed, doUpdatePrimaryFailed, doUpdatePrimarySucceed } from "@/Redux/Action/Resto/menuPhotoAction";
import { doDeleteMenuSucceed } from "@/Redux/Action/Resto/restoMenuAction";
import { API, FORMAPI } from "@/Redux/Configs/consumeApi"
import axios from "axios"
import { put } from "redux-saga/effects";

function* handleGetPhoto():any{
    try{
        const result = yield axios(API('Get', '/resto-menu-photos')) 
        yield put(doGetPhotoSucceed(result.data)) 
    }catch(err:any){
        yield put(doGetPhotoFailed(err))
    }
}

function* handleAddMenuPhoto(action:any):any{
    // debugger;
    console.warn('ini di photo process: ', action.payload);
    
    try{
        const result = yield axios(FORMAPI('Post','/resto-menu-photos/multiple',(action.payload)));
        yield put(doAddPhotoSucceed(action.payload)) 
    }catch(err:any){
        yield put(doAddPhotoFailed(err))
    }
}

function* handleUpdatePrimary(action:any):any{
    // debugger;
    try{
        const result = yield axios(API('Put','/resto-menu-photos/primary',action.payload));
        yield put(doUpdatePrimarySucceed(result.data))
    }catch(err:any){
        yield put(doUpdatePrimaryFailed(err))
    }
} 

function* handleDeletePhoto(action:any):any{
    try{ 
        yield axios(API('Delete','/resto-menu-photos/'+action.payload)); // kenapa kalau pake ini ga berhasil?
        yield put(doDeleteMenuSucceed(action.payload))
    }catch(err:any){
        yield put(doDeletePhotoFailed(err))
    }
}

export {
    handleGetPhoto,
    handleAddMenuPhoto,
    handleDeletePhoto,
    handleUpdatePrimary
}