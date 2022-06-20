import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "user",
  storage,
};

const reducers = combineReducers({ user: userSlice });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// import { persistReducer } from "redux-persist";
// import { encryptTransform } from "redux-persist-transform-encrypt";
// import storage from "redux-persist/lib/storage";

// const persistConfig: any = {
//   key: "root",
//   transforms: [
//     encryptTransform({
//       secretKey: "my-super-secret-key",
//       onError: function (error) {
//         // Handle the error.
//         console.log("error : ", error);
//       },
//     }),
//   ],
//   storage: storage
// };

// export const persistedReducer = persistReducer(persistConfig, usersSlice);

// export const store = configureStore({
//   reducer: {
//     user: userSlice
//   },
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
