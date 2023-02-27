//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doServiceTaskSucceed,
  doServiceTaskFailed,
  doAddServiceTaskSucceed,
  doAddServiceTaskFailed,
  doUpdateServiceTaskSucceed,
  doUpdateServiceTaskFailed,
  doDelServiceTaskSucceed,
  doDelServiceTaskFailed,
} from '../../Action/Master/actionServiceTask';
import apiServiceTask from '@/Redux/Service/master/apiMasterServiceTask';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET

function* handlerServiceTask(): any {
  try {
    const result = yield axios(API('GET', '/service'));
    yield put(doServiceTaskSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doServiceTaskFailed(error));
  }
}

// function* handlerServiceTask(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiServiceTask.getServiceTask);
//     console.log('saga service :', result);

//     yield put(doServiceTaskSucceed(result.data));
//   } catch (error) {
//     yield put(doServiceTaskFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddServiceTask(action: any): any {
  try {
    const res = yield axios(API('POST', '/service/insert', action.payload));
    yield put(doAddServiceTaskSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddServiceTaskFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddServiceTaskFailed(null));
  }
}
// function* handlerAddServiceTask(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiServiceTask.addServiceTask, action.payload);
//     yield put(doAddServiceTaskSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddServiceTaskFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateServiceTask(action: any): any {
  try {
    yield axios(
      API('PUT', 'service/edit/' + action.payload.setaId, action.payload)
    );
    yield put(doUpdateServiceTaskSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateServiceTaskFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateServiceTaskFailed(null));
  }
}

// function* handlerUpdateServiceTask(action: any) {
//   try {
//     yield call(apiServiceTask.updateServiceTask, action.payload);
//     yield put(doUpdateServiceTaskSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateServiceTaskFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteServiceTask(action: any): any {
  try {
    yield axios(API('DELETE', '/service/delete/' + action.payload));
    yield put(doDelServiceTaskSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteServiceTask(action: any) {
//   try {
//     yield call(apiServiceTask.deleteServiceTask, action.payload);
//     yield put(doDelServiceTaskSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelServiceTaskFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerServiceTask,
  handlerAddServiceTask,
  handlerUpdateServiceTask,
  handlerDeleteServiceTask,
};
