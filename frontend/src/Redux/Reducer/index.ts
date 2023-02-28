import { combineReducers } from "redux";
import { DeptReducer } from "./HR/department";
import { employeesReducer } from "./HR/employees";
import { detailEmpReducer } from "./HR/detailEmp";
import { selectReducer } from "./HR/select";

export default combineReducers({
  DeptReducer,
  employeesReducer,
  detailEmpReducer,
  selectReducer,
});
