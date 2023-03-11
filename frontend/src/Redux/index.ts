import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./saga";
import rootReducers from "./Reducer";



const sagas = createSagaMiddleware();


const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagas)
  )
);

sagas.run(rootSaga);

export default store;
