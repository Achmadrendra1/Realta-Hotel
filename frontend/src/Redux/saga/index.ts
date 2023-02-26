import { all, takeEvery } from 'redux-saga/effects'
import { handleAddDept, handleDeleteDept, handleGetDept, handleUpdateDept } from './HR/department'
import { deptType } from '../Constant/HR/deptType'
import { empType } from '../Constant/HR/empType'
import { handleDetailEmployee, handleGetEmployees } from './HR/employees'

export default function* rootSaga(){
    yield all([
        takeEvery(deptType.GET_DATA, handleGetDept),
        takeEvery(deptType.ADD_DATA, handleAddDept),
        takeEvery(deptType.UPDATE_DATA, handleUpdateDept),
        takeEvery(deptType.DELETE_DATA, handleDeleteDept),
        takeEvery(empType.GET_DATA, handleGetEmployees),
        takeEvery(empType.GET_DETAIL, handleDetailEmployee),
    ])
}