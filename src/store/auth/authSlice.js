import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { LOGIN_USER } from "../../axiosInstance/apiEndpoints";
import qs from "qs"; 

// Register AsyncThunk
export const register = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/register", payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
  }
});


// Async login action
export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const formBody = qs.stringify({
      username: payload.username,
      password: payload.password,
    });

    const res = await axiosInstance.post(LOGIN_USER, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    const token = res.data.access_token;
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error("Login failed:", error);
    return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
  }
});


const initialState = {
  ISLOADING: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.ISLOADING = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.ISLOADING = false;
      })
      .addCase(login.rejected, (state) => {
        state.ISLOADING = false;
      });
  },
});

export const { logout, setToken  , } = authSlice.actions;
export default authSlice.reducer;
