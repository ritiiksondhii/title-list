import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";
import { OptionType } from "./ISBNSReducer";

interface Author1datainterface {
  AUTHOR_1:string;
}

interface Author1State {
  data: Author1datainterface[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  Author1?:string[];
  Author1List?:OptionType[];
}
const initialState: Author1State = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  Author1:[],
  Author1List:[],
};

export const FetchAuthor1 = createAsyncThunk(
  "FetchAuthor1",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FetchAuthor1,data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const Author1Slice = createSlice({
  name: "Author1Data",
  initialState,
  reducers: {
    UpdateAuthor1:(state,action)=>{
      state.Author1=action.payload
    },
    UpdateAuthor1List:(state,action)=>{
      state.Author1List=action.payload
    },
    emptyAuthorReducer:(state) => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
      state.Author1 = initialState.Author1;
      state.Author1List = initialState.Author1List;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchAuthor1.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchAuthor1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(FetchAuthor1.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdateAuthor1,UpdateAuthor1List, emptyAuthorReducer}=Author1Slice.actions
export default Author1Slice.reducer