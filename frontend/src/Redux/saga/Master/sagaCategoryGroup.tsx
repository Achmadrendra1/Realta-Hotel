//Package lib
import { call, put } from '@redux-saga/core/effects';

//Artificial
import {
  doCategoryGroupSucceed,
  doCategoryGroupFailed,
  doAddCategoryGroupSucceed,
  doAddCategoryGroupFailed,
  doUpdateCategoryGroupSucceed,
  doUpdateCategoryGroupFailed,
  doDelCategoryGroupSucceed,
  doDelCategoryGroupFailed,
} from '../../Action/Master/actionCategoryGroup';
import apiCategoryGroup from '@/Redux/Service/master/apiMasterCategoryGroup';
import { API } from '@/Redux/Configs/consumeApi';
import axios from "axios";


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET
function* handlerCategoryGroup(): any {
  try {
    const result = yield axios(API('GET', '/category'));
    yield put(doCategoryGroupSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doCategoryGroupFailed(error));
  }
}


// function* handlerCategoryGroup(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiCategoryGroup.getCategoryGroup);
//     // console.log('saga category :', result);

//     yield put(doCategoryGroupSucceed(result.data));
//   } catch (error) {
//     yield put(doCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerAddCategoryGroup(action: any): any {
  try {
    const res = yield axios(API('POST', '/category/insert', action.payload));
    yield put(doAddCategoryGroupSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddCategoryGroupFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddCategoryGroupFailed(null));
  }
}


// function* handlerAddCategoryGroup(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiCategoryGroup.addCategoryGroup, action.payload);
//     yield put(doAddCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE
function* handlerUpdateCategoryGroup(action: any): any {
  try {
    yield axios(
      API("PUT", "category/edit/" + action.payload.cagroId, action.payload)
    );
    yield put(doUpdateCategoryGroupSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateCategoryGroupFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateCategoryGroupFailed(null));
  }
}

// function* handlerUpdateCategoryGroup(action: any): any {
//   try {
//     yield call(apiCategoryGroup.updateCategoryGroup, action.payload);
//     yield put(doUpdateCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateCategoryGroupFailed(error));
//   }
// }

//____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  DELETE
function* handlerDeleteCategoryGroup(action: any): any {
  try {
    yield axios(API("DELETE", "/category/delete/" + action.payload));
    yield put(doDelCategoryGroupSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteCategoryGroup(action: any): any {
//   try {
//     yield call(apiCategoryGroup.deleteCategoryGroup, action.payload);
//     yield put(doDelCategoryGroupSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelCategoryGroupFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerCategoryGroup,
  handlerAddCategoryGroup,
  handlerUpdateCategoryGroup,
  handlerDeleteCategoryGroup,
};
  