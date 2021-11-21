import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export const middlewares = [thunk];

const reduxDevToolExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

export const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  reduxDevToolExtension
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__
//             ? window.__REDUX_DEVTOOLS_EXTENSION__()
//             : f => f
//     )
// );

export default store;
