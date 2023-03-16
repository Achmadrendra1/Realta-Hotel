import { doMenuFailed, doMenuSucceed } from '@/Redux/Action/Resto/menuAction';
import { API } from '@/Redux/Configs/consumeApi';
import axios from 'axios'
import { put } from 'redux-saga/effects';

function* processMenu():any{
    try{
        const result = yield axios(API('Get','/resto-menu-detail',null));
        yield put(doMenuSucceed(result.data)) 
    }catch(err:any){
        yield put(doMenuFailed(err))
    }
}

export {
    processMenu,
}