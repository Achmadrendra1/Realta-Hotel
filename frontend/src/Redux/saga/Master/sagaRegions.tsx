//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doRegionsSucceed,
  doRegionsFailed,
  doAddRegionsSucceed,
  doAddRegionsFailed,
  doUpdateRegionsSucceed,
  doUpdateRegionsFailed,
  doDelRegionsSucceed,
  doDelRegionsFailed,
} from '../../Action/Master/actionRegions';
import apiRegions from '@/Redux/Service/master/apiMasterRegions';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerRegions(): any {
  try {
    const result = yield axios(API('GET', '/regions'));
    yield put(doRegionsSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doRegionsFailed(error));
  }
}

// Alternatif with Service
// function* handlerRegions(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiRegions.getRegions);
//     // console.log(result.data);
//     yield put(doRegionsSucceed(result.data));
//   } catch (error) {
//     yield put(doRegionsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddRegions(action: any): any {
  try {
    const res = yield axios(API('POST', '/regions/insert', action.payload));
    yield put(doAddRegionsSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddRegionsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddRegionsFailed(null));
  }
}

// function* handlerAddRegions(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiRegions.addRegions, action.payload);
//     yield put(doAddRegionsSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddRegionsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateRegions(action: any): any {
  try {
    yield axios(
      API('PUT', 'regions/edit/' + action.payload.regionCode, action.payload)
    );
    yield put(doUpdateRegionsSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateRegionsFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateRegionsFailed(null));
  }
}

// function* handlerUpdateRegions(action: any) {
//   try {
//     yield call(apiRegions.updateRegions, action.payload);
//     yield put(doUpdateRegionsSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateRegionsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  Delete

function* handlerDeleteRegions(action: any): any {
  try {
    yield axios(API('DELETE', '/regions/delete/' + action.payload));
    yield put(doDelRegionsSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteRegions(action: any) {
//   try {
//     yield call(apiRegions.deleteRegions, action.payload);
//     yield put(doDelRegionsSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelRegionsFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerRegions,
  handlerAddRegions,
  handlerUpdateRegions,
  handlerDeleteRegions,
};
