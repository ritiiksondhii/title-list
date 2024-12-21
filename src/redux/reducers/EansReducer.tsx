import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { API } from "../../constants/API";
import { isbnsData } from "./ISBNSReducer";

export interface eanObj {
  _id: string;
  EAN: number;
  Title: string;
}

interface ean {
  eans?: isbnsData[];
  status?: number;
  message?: string;
  page:number;
  limit:number;
  searchStr:string;
  eanScrollPosition:number;
  isLoading:boolean;
  isbnHasMore: boolean;
}

interface eanInterface {
    _id:string;
    EAN:number;
    Title:string;
}

interface newIsbnState {
  message?: string;
  err?: string;
  status?: string;
  eans : ean;
  // eanSelectedValue?:eanInterface
}

const initialState: newIsbnState = {
  err: "",
  status: "",
  message: "",
  eans:{
    eans:[],
    isLoading:false,
    status:0,
    message:"",
    page:1,
    limit:10,
    searchStr:"",
    eanScrollPosition:0,
    isbnHasMore:true,

  },
  // eanSelectedValue:{
  //   _id:"",
  //   EAN:0,
  //   Title:"",
  // },
};

export const fetchEans = createAsyncThunk(
  "ean/fetchEans",
  async (data:{searchStr:string, page:number,limit:number,oldEans:any,selectedEans?:any}, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHISBNSLIST,data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const newEANSlice = createSlice({
  name: "ean",
  initialState,
  reducers: {
    updateEanSearchStr: (state,action) => {
      state.eans.searchStr = action.payload
    },
    updateEanPage:(state) => {
      state.eans.page += 1;
    },
    updateEanScrollPosition:(state,action) => {
      state.eans.eanScrollPosition = action.payload
    },
    // updateSearchStr:(state,action) => {
    //   state.eans.searchStr = action.payload;
    // },
    emptyEansScrollPosition:(state) => {
      state.eans.eanScrollPosition = initialState.eans.eanScrollPosition;
    },
    // updateEanSelectedValue:(state,action) => {
    //   state.eanSelectedValue = action.payload;
    // },
    emptyEansValue:(state) => {
      // state.eanSelectedValue = initialState.eanSelectedValue;
      state.eans= initialState.eans;
      state.err = initialState.err;
      state.message = initialState.message;
      state.status = initialState.status;
    }
  },
  extraReducers: (builder) => {

      builder
      .addCase(fetchEans.pending, (state) => {
        state.eans.isLoading = true;
      })
      .addCase(fetchEans.fulfilled, (state, action: PayloadAction<any>) => {
        state.eans.isLoading = false;
        state.eans.isbnHasMore = action.payload.data.hasMore;
        if(state.eans.eans)
          state.eans.eans.push(...action.payload.data.data);
        }
      )
      .addCase(fetchEans.rejected, (state, action: PayloadAction<any>) => {
        state.eans.isLoading = false;
        state.eans.status = action.payload.status
      });
  },
});

export const {
    updateEanPage,
    updateEanSearchStr,
    updateEanScrollPosition,
    emptyEansScrollPosition,
    // updateEanSelectedValue,
    emptyEansValue,
} = newEANSlice.actions;

export default newEANSlice.reducer;
