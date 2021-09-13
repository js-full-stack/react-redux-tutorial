import counterReducer from "./Counter/counter-reducer";
import counterSlicesReducer from "./CounterSlices/counter-reducer";
import todosReducer from "./Todos/todos-reducer";

import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const myCustomMiddlware = (store) => (next) => (action) => {
  console.log("Срабатывает каждый раз при экшне");

  // return next(action) передает управление дальше
  return next(action);
};

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(myCustomMiddlware, logger);

const persistConfig = {
  key: "root",
  storage,
  blacklist: "step",
};
const rootReducer = combineReducers({
  counter: persistReducer(persistConfig, counterReducer),
  counterSlices: counterSlicesReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware,
});

export const persistor = persistStore(store);
