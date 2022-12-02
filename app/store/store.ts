import taskSlice from "./../slices/taskSlice";
import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "../slices/projectSlice";

import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectSlice,
    task: taskSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
