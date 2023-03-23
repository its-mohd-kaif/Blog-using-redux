import { configureStore } from "@reduxjs/toolkit";
import ReduxSlice from "./ReduxSlice";
// Store
const store = configureStore({
  reducer: {
    blogs: ReduxSlice,
  },
});

export default store;
