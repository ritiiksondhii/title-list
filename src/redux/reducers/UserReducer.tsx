import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { API } from "../../constants/API";

interface UserData {
  _id?: string;
  fullName?: string;
  role?: string[];
  first_name?: string;
  last_name?: string;
  status: number;
  message: "";
}

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
}

interface UserState {
  userData?: UserData;
  user: User[];
  isLoading?: boolean;
  isError?: boolean;
  status?: string;
  statusCode: number;
  message: string;
}

const initialState: UserState = {
  user: [],
  isLoading: false,
  isError: false,
  status: "",
  statusCode: 0,
  message: "",
  userData: {
    fullName: "",
    first_name: "",
    last_name: "",
    role: [],
    status: 0,
    message: "",
  },
};

export const addUser = createAsyncThunk(
  "addUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.ADDUSER, data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.FETCHUSERS}/${data.role}`);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.fetchUserInfo);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// export const sendOnboardingMail = createAsyncThunk(
//   "user/sendOnboardingMail",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API.SENDONBOARDINGMAIL}/${id}`);
//       return response;
//     } catch (err: any) {
//       return rejectWithValue(err.response);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyStatusMessage: (state) => {
      state.statusCode = initialState.statusCode;
      state.message = initialState.message;
    },
    updateLoginUserData:(state,action) => {
      state.userData = action.payload
    }
  },

  extraReducers: (builder) => {
    // fetch user data cases
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.userData = action.payload.data;
        localStorage.setItem("userroles", action.payload.data?.role);
        if (state.userData) {
          state.userData.status = action.payload.status;
          state.userData.message = action.payload.data.message;
        }
      })
      .addCase(fetchUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        if (state.userData) {
          state.userData.status = action.payload.status;
          state.userData.message = action.payload.data.message
            ? action.payload.data.message
            : (action.payload.data.msg && action.payload.data.msg) ||
              "Error Occured";
        }
      });

    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.push(action.payload.data.data);
      state.message = action.payload.data.message;
      state.statusCode = action.payload.status;
    });
    builder.addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
      state.isError = true;
      state.statusCode = action.payload.status;
      state.message = action.payload.data.message;
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isError = true;
    });

    // builder.addCase(sendOnboardingMail.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(sendOnboardingMail.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.message = action.payload.data.message;
    //   state.statusCode = action.payload.status;
    // });
    // builder.addCase(
    //   sendOnboardingMail.rejected,
    //   (state, action: PayloadAction<any>) => {
    //     state.isError = true;
    //     state.statusCode = action.payload.status;
    //     state.message = action.payload.data.message;
    //   }
    // );
  },
});

export const { emptyStatusMessage, updateLoginUserData } = userSlice.actions;

export const Users = (state: RootState) => state.UserReducer.user;
export const user = (state: RootState) => state.UserReducer.userData;

export default userSlice.reducer;
