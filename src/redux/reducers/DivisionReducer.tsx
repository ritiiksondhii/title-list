import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

export interface DivisionItem {
    division:string;
    _id: string;
}

interface OptionType {
  value: string;
  label: string;
}
interface SeasonState {
  data: DivisionItem [];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  selectedDivision?:string[];
  selectedDivisionList?:string[];
}
const initialState: SeasonState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedDivision:[],
  selectedDivisionList:[],
};

export const fetchDivision = createAsyncThunk(
  "fetchDivision",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHDIVISION, data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const DivisionSlice = createSlice({
  name: "DivisionData",
  initialState,
  reducers: {
    UpdateSelectedDivision:(state,action)=>{
      state.selectedDivision=action.payload
    },
    UpdateSelectedDivisionList:(state,action)=>{
      state.selectedDivisionList=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDivision.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(fetchDivision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(fetchDivision.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdateSelectedDivision, UpdateSelectedDivisionList}=DivisionSlice.actions
export default DivisionSlice.reducer