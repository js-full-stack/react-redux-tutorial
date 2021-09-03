import counterReducer from "./Counter/counter-reducer";
import counterSlicesReducer from "./CounterSlices/counter-reducer";
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

const middlwares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(logger);

const persistConfig = {
  key: "root",
  storage,
  // blacklist: "step",
};
const rootReducer = combineReducers({
  counter: persistReducer(persistConfig, counterReducer),
  counterSlices: counterSlicesReducer,
});
// const rootReducer = combineReducers({ counter: counterReducer });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: middlwares,
});

export const persistor = persistStore(store);
