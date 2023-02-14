# Redux
Konfigurasi redux by Emil

## Config
Folder ini berisikan url.ts dan consumeApi.ts
- url.ts berisikan objek url yang akan dibutuhkan
- consumeApi.ts berisikan sebuah function yang berguna sebagai option untuk fetching api untuk axios

### Penggunaan consumeApi.ts
Fungsi pada consumeApi antara lain:
```ts
    export const API = (method:string, url:any, data:any) => {
        return{
            method: method,
            url: `${configuration.BASE_URL}${url}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: data 
        }
    }
```
Di dalam konfigurasi redux project ini dibentuk oleh Emil tanpa menggunakan service, makan untuk consume API atau fetching API di lakukan langsung di dalam saga dan memanggil option yang ada pada fungsi di atas, dengan contoh sebagai berikut:

```ts
    return yield axios(API('post', `/login`, data))
```

## Constant
Berisikan objek array yang di atur dari setiap module masing - masing
example
```ts
    export const hr = {
        GET_DATA: 'GET_DATA',
        GET_SUCCESS: 'GET_DATA_SUCCESS',
        GET_FAILED: 'GET_DATA_FAILED'
    }
```

## Action
Action terdiri dari folder - folder module yang berisikan action untuk melakukan komunikasi terhadap redux-saga atau middleware

## Saga
Saga terdiri dari folder - folder setiap module yang berisikan perintah untuk consume API atau fetching API dan dikembalikan kepada reducer. Setiap fungsi yang telah dibuat dalam folder module masing - masing, fungsi harus didaftarkan di dalam index.ts yang ada di dalam folder saga, contoh:
```ts
    import { all, takeEvery } from 'redux-saga/effects'

    export default function* rootSaga(){
        yield all([
            takeEvery(action, fungsi_saga)
        ])
    }
```

## Reducer
Reducer terdiri dari folder - folder setiap modulenya yang bertujuan untuk menampung data atau sebagai store sementara pada reactjs/nextjs, apabila kalian sudah membuat store reducer di masing - masing foldernya, kalian harus daftarkan store atau reducer yang kalian buat seperti kalian mendaftarkan fungsi yang ada di saga, dengan contoh:

```ts
    import { combineReducers } from "redux";
    import { nama_reducer } from "./folder_reducer/file_reducer"

    export default combineReducers({
        nama_reducer,
    })
```