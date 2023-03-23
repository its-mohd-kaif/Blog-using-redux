import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Redux Initial States
const initialState = {
  users: [],
  blogs: [],
  loading: true,
};
// Fetch blogs Api Function
export const fetchBlogs = createAsyncThunk("user/fetchblogs", async () => {
  return await fetch("https://dummyjson.com/posts")
    .then((resp) => resp.json())
    .catch((err) => console.log(err.message));
});
const reduxSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // Action For Add User
    addUser: (state, action) => {
      if (JSON.parse(localStorage.getItem("blogUsers")) !== null) {
        state.users = JSON.parse(localStorage.getItem("blogUsers"));
      }
      state.users.push(action.payload);
      localStorage.setItem("blogUsers", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    // Fetch blogs
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.error = action.error.message;
    });
  },
});
// Export All Actions
export const { addUser } = reduxSlice.actions;

export default reduxSlice.reducer;
