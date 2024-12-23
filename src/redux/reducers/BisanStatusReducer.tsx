import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

interface bisacStatusdatainterface {
  BISAC_STATUS:string;
}

interface bisacStatusState {
  data: bisacStatusdatainterface[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  bisacStatus?:string[];
  bisacStatusList?:string[];
}
const initialState: bisacStatusState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  bisacStatus:[],
  bisacStatusList:[],
};

export const FetchbisacStatus = createAsyncThunk(
  "FetchbisacStatus",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FetchBisacStatus,data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const bisacStatusSlice = createSlice({
  name: "bisacStatusData",
  initialState,
  reducers: {
    UpdatebisacStatus:(state,action)=>{
      state.bisacStatus=action.payload
    },
    UpdatebisacStatusList:(state,action)=>{
      state.bisacStatusList=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchbisacStatus.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchbisacStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(FetchbisacStatus.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdatebisacStatus,UpdatebisacStatusList}=bisacStatusSlice.actions
export default bisacStatusSlice.reducer