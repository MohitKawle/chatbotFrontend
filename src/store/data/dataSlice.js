import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { data } from "react-router-dom";

const initialState = {
  messages: [{
    data: "Hi, I am your AI assistant. How can I help you today?", from: "bot"}],
  loading: false,
  error: null,
};

// Utility: safely get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Api-Version": "v1",
  };
};

// 🔹 Thunk for generating bullet points
export const generateBulletPoints = createAsyncThunk(
  "data/generateBulletPoints",
  async (text, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/generate-bullet-points/",
        { text },
        {
          headers: getAuthHeaders(),
        }
      );
      return { data: response.data.bullet_points || response.data, from: "bot" };
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.detail && Array.isArray(errorData.detail)) {
        return rejectWithValue({
          data: errorData.detail.map((e) => e.msg).join("\n"),
          from: "bot",
        });
      }
      return rejectWithValue({ data: err.message, from: "bot" });
    }
  }
);

// 🔹 Thunk for generating summary
export const generateSummary = createAsyncThunk(
  "data/generateSummary",
  async (text, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/generate-summary/",
        { text },
        {
          headers: getAuthHeaders(),
        }
      );
      return { data: response.data.summary, from: "bot" };
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.detail && Array.isArray(errorData.detail)) {
        return rejectWithValue({
          data: errorData.detail.map((e) => e.msg).join("\n"),
          from: "bot",
        });
      }
      return rejectWithValue({ data: err.message, from: "bot" });
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // { data, from }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateBulletPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateBulletPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(generateBulletPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push(action.payload);
      })
      .addCase(generateSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(generateSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage, clearMessages } = dataSlice.actions;
export default dataSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance/axiosInstance";
// import { data } from "react-router-dom";

// const initialState = {
//   messages: [{
//     data: "Hi, I am your AI assistant. How can I help you today?", from: "bot"}],
//   loading: false,
//   error: null,
// };

// // Utility: safely get token
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   console.log("token",token)
//   return {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "Api-Version": "v1",
//   };
// };

// // 🔹 Thunk for generating bullet points
// export const generateBulletPoints = createAsyncThunk(
//   "data/generateBulletPoints",
//   async (text, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         "/api/generate-bullet-points/",
//         { text },
//         {
//           headers: getAuthHeaders(),
//         }
//       );
//       return { data: response.data.bullet_points || response.data, from: "bot" };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 Thunk for generating summary
// export const generateSummary = createAsyncThunk(
//   "data/generateSummary",
//   async (text, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         "/api/generate-summary/",
//         { text },
//         {
//           headers: getAuthHeaders(),
//         }
//       );
//       return { data: response.data.summary, from: "bot" };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const dataSlice = createSlice({
//   name: "data",
//   initialState,
//   reducers: {
//     addMessage: (state, action) => {
//       state.messages.push(action.payload); // { data, from }
//     },
//     clearMessages: (state) => {
//       state.messages = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateBulletPoints.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(generateBulletPoints.fulfilled, (state, action) => {
//         state.loading = false;
//         state.messages.push(action.payload);
//       })
//       .addCase(generateBulletPoints.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(generateSummary.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(generateSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.messages.push(action.payload);
//       })
//       .addCase(generateSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addMessage, clearMessages } = dataSlice.actions;
// export default dataSlice.reducer;


