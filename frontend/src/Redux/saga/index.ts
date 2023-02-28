import { all, takeEvery } from 'redux-saga/effects'
import { handleAddDept, handleDeleteDept, handleGetDept, handleUpdateDept } from './HR/department'
import { deptType } from '../Constant/HR/deptType'
import { empType } from '../Constant/HR/empType'
import { handleAddEmployee, handleDetailEmployee, handleGetEmployees } from './HR/employees'
import { jobType } from '../Constant/HR/jobType'
import { handleSelectJob } from './HR/select'

export default function* rootSaga(){
    yield all([
        takeEvery(deptType.GET_DATA, handleGetDept),
        takeEvery(deptType.ADD_DATA, handleAddDept),
        takeEvery(deptType.UPDATE_DATA, handleUpdateDept),
        takeEvery(deptType.DELETE_DATA, handleDeleteDept),
        takeEvery(empType.GET_DATA, handleGetEmployees),
        takeEvery(empType.GET_DETAIL, handleDetailEmployee),
        takeEvery(jobType.GET_SELECT_JOB, handleSelectJob),
        takeEvery(empType.ADD_DATA, handleAddEmployee)
    ])
}