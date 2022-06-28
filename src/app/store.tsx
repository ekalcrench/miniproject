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
import categorySlice from "../features/categorySlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import searchSlice from "../features/searchSlice";

const rootPersistConfig = {
  key: "fashionbox",
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        console.log("error : ", error);
      },
    }),
  ],
  storage: storage,
  blacklist: ["search"],
};

const rootReducer = combineReducers({
  user: userSlice,
  category: categorySlice,
  search: searchSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
