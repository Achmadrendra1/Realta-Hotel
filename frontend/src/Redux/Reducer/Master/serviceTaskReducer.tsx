//package lib

//Artificial
import ActionTypes from '@/Redux/Constant/Master/masterActionType';
import serviceTask from '@/components/master/serviceTask';

interface InitialState {
  serviceTask: any[];
}

const initialState: InitialState = {
  serviceTask: [],
};

// Function ServiceTask Reducer
function serviceTaskReducer(state = initialState, action: any) {
  //---------------------------------------------------------------------------------------------------------------------------------------
  //Get
  switch (action.type) {
    case ActionTypes.GET_SERVICE_TASK:
      return { ...state };
    case ActionTypes.GET_SERVICE_TASK_SUCCEED:
      return { ...state, serviceTask: action.payload };
    case ActionTypes.GET_SERVICE_TASK_FAILED:
      return { ...state, serviceTask: action.payload };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // ADD
    case ActionTypes.ADD_SERVICE_TASK:
      return { ...state };
    case ActionTypes.ADD_SERVICE_TASK_SUCCEED:
      return { ...state, serviceTask: [...state.serviceTask, action.payload] };
    case ActionTypes.ADD_SERVICE_TASK_FAILED:
      return { ...state, serviceTask: [...state.serviceTask, action.payload] };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // DEL
    case ActionTypes.DEL_SERVICE_TASK:
      return { ...state };
    case ActionTypes.DEL_SERVICE_TASK_SUCCEED:
      return {
        ...state,
        serviceTask: state.serviceTask.filter(
          (serviceTask) => serviceTask.setaId !== action.payload
        ),
      };
    case ActionTypes.DEL_SERVICE_TASK_FAILED:
      return {
        ...state,
        serviceTask: state.serviceTask.filter(
          (serviceTask) => serviceTask.setaId !== action.payload.id
        ),
      };

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //Default
    default:
      return state;
  }
}

export default serviceTaskReducer;
