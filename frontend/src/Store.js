import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./Redux/articleSlice";

const store = configureStore({
  reducer: {
    article: articleReducer, // إضافة slice الخاصة بالمقالات
  },
});

export default store;
