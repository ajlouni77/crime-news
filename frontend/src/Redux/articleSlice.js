import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articleId: null, // القيمة الافتراضية
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticleId: (state, action) => {
      state.articleId = action.payload; // تحديث ID المقال
    },
  },
});

export const { setArticleId } = articleSlice.actions;
export default articleSlice.reducer;
