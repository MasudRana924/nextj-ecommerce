// store/slices/loginSlice.js
import { publicPost } from "@/utilitis/apiCaller";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const createLogin = createAsyncThunk(
  "/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/login", data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    success: false,
    error: "",
    errorMessage: "",
    response: false,
    loggeduser: [],  // user information
    token: null,      // user authentication token
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.loggeduser = [];
      localStorage.removeItem("walletNo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createLogin.pending, (state) => {
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(createLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.token = action.payload.token;
      state.loggeduser = action.payload;
      state.error = "";
    });
    builder.addCase(createLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
