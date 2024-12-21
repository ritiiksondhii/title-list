import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
// import { API } from "../../constants/API";

interface statusObj {
  message?: string;
  status?: number;
}

interface profileState {
  message?: string;
  err?: string;
  status?: string;
  token?: string;
  statusCode?: number;
  logout?: statusObj;
  userData?: {
    _id?:string;
    email?:string;
    first_name?:string;
    isActive?:boolean;
    last_name?:string;
    role?:string[]
  }
}

interface loginData {
  email: string;
  password?: string;
}

const initialState: profileState = {
  token: "",
  err: "",
  status: "",
  message: "",
  statusCode: 0,
  logout: {
    message: "",
    status: 0,
  },
  userData:{
    _id: "",
    email: "",
    first_name: "",
    isActive: false,
    last_name: "",
    role: []
  }
};

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       // const response = await axios.post(API.LOGINUSER, data);
//       return response;
//     } catch (err: any) {
//       return rejectWithValue(err.response);
//     }
//   }
// );
// export const logoutUser = createAsyncThunk(
//   "user/logoutUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       // const response = await axios.post(API.LOGOUTUSER);
//       return response;
//     } catch (err: any) {
//       return rejectWithValue(err.response);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    emptyLogout: (state) => {
      if (state.logout) {
        state.logout.message = "";
        state.logout.status = 0;
      }
    },
    emptyUserObj: (state) => {
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
      state.status = initialState.status;
      state.err = initialState.err;
    },
  },
  // extraReducers: (builder) => {
  //   // login user cases

  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
  //       state.status = "succeeded";
  //       if (action.payload.data?.userToken && action.payload.status == 200)
  //         localStorage.setItem("token", action.payload.data.userToken);
  //       state.token = action.payload.data?.userToken
  //         ? action.payload.data.userToken
  //         : "";
  //         state.userData = action.payload.data.data
  //       state.statusCode = action.payload.status;
  //       state.message = action.payload.data.message;
  //     })
  //     .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
  //       state.status = "failed";
  //       state.statusCode = action.payload.status;
  //       state.message = action.payload.data.message;
  //     });

  //   // logout user

  //   builder
  //     .addCase(logoutUser.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(logoutUser.fulfilled, (state, action: PayloadAction<any>) => {
  //       if (state.logout) {
  //         state.logout.message = action.payload.data.message;
  //         state.logout.status = action.payload.status;
  //       }
  //       state.err = "";
  //       state.message = "";
  //       state.status = "";
  //       state.token = "";
  //       state.statusCode = 0;
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("userroles");
  //     })
  //     .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
  //       state.status = "failed";
  //       state.statusCode = action.payload.status;
  //       state.message = action.payload.data.message;
  //     });
  // },
});

export const { emptyUserObj, emptyLogout } = userSlice.actions;

export const userProfile = (state: RootState) => state.profileReducer;

export default userSlice.reducer;
