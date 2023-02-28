//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doLocationsRCSucceed,
  doLocationsRCFailed,
  doAddLocationsRCSucceed,
  doAddLocationsRCFailed,
  doUpdateLocationsRCSucceed,
  doUpdateLocationsRCFailed,
  doDelLocationsRCSucceed,
  doDelLocationsRCFailed,
} from '../../Action/Master/actionLocationsRC';
import apiLocationsRC from '@/Redux/Service/master/apiMasterLocationsRC';
import { API } from '@/Redux/Configs/consumeApi';

import axios from "axios";

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerLocationsRC(): any {
  try {
    const result = yield axios(API('GET', '/regions/locationsRC'));
    yield put(doLocationsRCSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doLocationsRCFailed(error));
  }
}


// Alternatif with Service
// function* handlerLocationsRC(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiLocationsRC.getLocationsRC);
//     // console.log(result.data);
//     yield put(doLocationsRCSucceed(result.data));
//   } catch (error) {
//     yield put(doLocationsRCFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerAddLocationsRC(action: any): any {
  try {
    const res = yield axios(API('POST', '/regions/locationsRC/insert', action.payload));
    yield put(doAddLocationsRCSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddLocationsRCFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddLocationsRCFailed(null));
  }
}
// function* handlerAddLocationsRC(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiLocationsRC.addLocationsRC, action.payload);
//     yield put(doAddLocationsRCSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddLocationsRCFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateLocationsRC(action: any): any {
  try {
    yield axios(
      API("PUT", "regions/locationsRC/edit/" + action.payload.regionCode, action.payload)
    );
    yield put(doUpdateLocationsRCSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateLocationsRCFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateLocationsRCFailed(null));
  }
}
// function* handlerUpdateLocationsRC(action: any) {
//   try {
//     yield call(apiLocationsRC.updateLocationsRC, action.payload);
//     yield put(doUpdateLocationsRCSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateLocationsRCFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteLocationsRC(action: any): any {
  try {
    yield axios(API("DELETE", "/regions/locationsRC/delete/" + action.payload));
    yield put(doDelLocationsRCSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}



// function* handlerDeleteLocationsRC(action: any) {
//   try {
//     yield call(apiLocationsRC.deleteLocationsRC, action.payload);
//     yield put(doDelLocationsRCSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelLocationsRCFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerLocationsRC,
  handlerAddLocationsRC,
  handlerUpdateLocationsRC,
  handlerDeleteLocationsRC,
};
  function* axios(arg0: any) {
    throw new Error('Function not implemented.');
  }

