import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

export interface Imprint {
  IMPRINT: string;
  _id: string;
}

interface OptionType {
  value: string;
  label: string;
}
interface SeasonState {
  data: Imprint[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  selectedImprint:string[];
  selectedImprintList:string[];
}
const initialState: SeasonState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedImprint:[],
selectedImprintList:[],
};

export const fetchImprint = createAsyncThunk(
  "fetchImprint",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHIMPRINTS, data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const ImprintSlice = createSlice({
  name: "ImprintData",
  initialState,
  reducers: {
    UpdateSelectedImprint:(state,action)=>{
      state.selectedImprint=action.payload
    },
    UpdateSelectedImprintList:(state,action)=>{
      state.selectedImprintList=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchImprint.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(fetchImprint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(fetchImprint.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const {UpdateSelectedImprint, UpdateSelectedImprintList} = ImprintSlice.actions;
export default ImprintSlice.reducer;
