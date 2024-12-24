import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

export interface TitleListItem {
  _id:string,
  EAN: number;
  SEASON: string;
  GROUP_1: string;
  TESTIMPRINTFROMHNA: string;
  FULL_TITLE: string;
  AUTHOR_1: string;
  PUB_DATE: string;
  RELEASE_DATE: string;
  FORMAT: string;
  US_PRICE: number;
  //   //Float + Blank
  //   pubGoalTotal: "PUB GOAL (TOTAL)";
  //   totalCurrentEstimate: "TOTAL CURRENT ESTIMATE";
  //   estimatePubGoal: "ESTIMATE VS PUB GOAL";
  //   totalInitialOrders: "TOTAL INITIAL ORDERS";
}

interface TitleListState {
  data: TitleListItem[];
  status: string;
  hasMore:boolean;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  page: number;
  prevPage: number;
  limit: number;
  selectedRowIndex: number| any;
}
const initialState: TitleListState = {
  data: [],
  page: 1,
  limit: 15,
  status: "",
  hasMore:false,
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedRowIndex: 0,
  prevPage:1,
};

export const FetchTitleListRecord = createAsyncThunk(
  "FetchTitleListRecord",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.POSTTitleListData,data)
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const TitleListSlice = createSlice({
  name: "TitleListData",
  initialState,
  reducers: {
    emptyTitleListPage:(state) => {
      state.page = initialState.page;
      state.data = initialState.data;
      state.selectedRowIndex = initialState.selectedRowIndex;
      state.prevPage = initialState.prevPage;
      state.status = initialState.status;
      state.statusCode = initialState.statusCode;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
      state.limit = initialState.limit;
      state.hasMore = initialState.hasMore;
    },
    UpdatePagination: (state) => {
      state.page = state.page + 1
    },
    emptyPreviousTitleListRecords:(state)=>{
      state.data=initialState.data
    },
    setSelectedRowIndex:(state,action)=>{
      state.selectedRowIndex=action.payload
    },
    updatePrevPage:(state,action) => {
      state.prevPage = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchTitleListRecord.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchTitleListRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.hasMore = action.payload.hasMore
        if(action.payload.filteredNew){
          state.data = action.payload.TitleLists
          state.page = 1
          state.selectedRowIndex = 0
        }
        else
        state.data.push(...action.payload.TitleLists)
      })
      .addCase(FetchTitleListRecord.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});

export const {emptyTitleListPage, UpdatePagination,emptyPreviousTitleListRecords,setSelectedRowIndex,updatePrevPage} = TitleListSlice.actions;
export default TitleListSlice.reducer;
