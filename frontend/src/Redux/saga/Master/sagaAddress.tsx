//Package lib
import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
//Artificial
import {
  doAddressSucceed,
  doAddressFailed,
  doAddAddressSucceed,
  doAddAddressFailed,
  doUpdateAddressSucceed,
  doUpdateAddressFailed,
  doDelAddressSucceed,
  doDelAddressFailed,
} from '../../Action/Master/actionAddress';
import apiAddress from '@/Redux/Service/master/apiMasterAddress';
import { API } from '@/Redux/Configs/consumeApi';


//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  GET

function* handlerAddress(): any {
  try {
    const result = yield axios(API('GET', '/address'));
    yield put(doAddressSucceed(result.data));
    return result.data;
  } catch (error) {
    yield put(doAddressFailed(error));
  }
}

//ALTERNATIF WITH SERVICE
// function* handlerAddress(): any {
//   try {
//     const result = yield call(apiAddress.getAddress);
//     // console.log('saga Address: ', result.data);
//     yield put(doAddressSucceed(result.data));
//   } catch (error: any) {
//     yield put(doAddressFailed(error));
//   }
// }

// function* handlerAddress(): any {
//   //Jika Postman menampilkan result data
//   try {
//     const result = yield call(apiAddress.getAddress);
//     console.log('result :', result);

//     yield put(doAddressSucceed(result.data));
//   } catch (error) {
//     yield put(doAddressFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD
function* handlerAddAddress(action: any): any {
  try {
    const res = yield axios(API('POST', '/address/insert', action.payload));
    yield put(doAddAddressSucceed(res.data.result));
    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doAddAddressFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doAddAddressFailed(null));
  }
}

// function* handlerAddAddress(action: any): any {
//   //jika return di postman a cuma menampilkan string tidak pakai result
//   try {
//     yield call(apiAddress.addAddress, action.payload);
//     yield put(doAddAddressSucceed(action.payload));
//   } catch (error) {
//     yield put(doAddAddressFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  UPDATE

function* handlerUpdateAddress(action: any): any {
  try {
    yield axios(
      API("PUT", "address/edit/" + action.payload.addrId, action.payload)
    );
    yield put(doUpdateAddressSucceed(action.payload));
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUpdateAddressFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUpdateAddressFailed(null));
  }
}

// function* handlerUpdateAddress(action: any) {
//   try {
//     yield call(apiAddress.updateAddress, action.payload);
//     yield put(doUpdateAddressSucceed(action.payload));
//   } catch (error) {
//     yield put(doUpdateAddressFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________
//  ADD

function* handlerDeleteAddress(action: any): any {
  try {
    yield axios(API("DELETE", "/address/delete/" + action.payload));
    yield put(doDelAddressSucceed(action.payload));
  } catch (error: any) {
    console.log(error);
  }
}

// function* handlerDeleteAddress(action: any) {
//   try {
//     yield call(apiAddress.deleteAddress, action.payload);
//     yield put(doDelAddressSucceed(action.payload));
//   } catch (error) {
//     yield put(doDelAddressFailed(error));
//   }
// }

//_____________________________________________________________________________________________________________________________________________________________________________________________________________________

export {
  handlerAddress,
  handlerAddAddress,
  handlerUpdateAddress,
  handlerDeleteAddress,
};
