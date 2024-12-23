import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

export interface SeasonItem {
  SEASON: string;
  seasonName: string;
  seasonYear: number;
}
interface OptionType {
  value: string;
  label: string;
}
interface SeasonState {
  data: SeasonItem[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  selectedSeason?:string[];
  selectedSeasonList?:string[];
}
const initialState: SeasonState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedSeason:[],
  selectedSeasonList:[],
};

export const FetchSeason = createAsyncThunk(
  "FetchSeason",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHSEASON,data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const SeasonSlice = createSlice({
  name: "SeasonData",
  initialState,
  reducers: {
    UpdateSelectedSeason:(state,action)=>{
      state.selectedSeason=action.payload
    },
    UpdateSelectedSeasonList:(state,action)=>{
      state.selectedSeasonList=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchSeason.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchSeason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(FetchSeason.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdateSelectedSeason,UpdateSelectedSeasonList}=SeasonSlice.actions
export default SeasonSlice.reducer