import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { API } from "../../constants/API";
export interface isbnsData {
  _id?:string;
  ISBN?:string;
  FULL_TITLE?:string;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface accountObj {
  _id: string;
  ACCOUNT_NAME: string;
  ACCOUNT_NBR: string;
}

interface account {
  accounts?: accountObj[];
  status?: number;
  message?: string;
  page:number;
  limit:number;
  searchStr:string;
  accountNumberScrollPosition:number;
  isLoading:boolean;
  accountHasMore:boolean;
}

interface newIsbnState {
  message?: string;
  err?: string;
  status?: string;
  selectedISBNS:string[],
  selectedISBNSList:OptionType[],
  selectedTitles:string[],
  selectedTitlesList:OptionType[],
  statusCode:number,
  isbns: isbnsData[];
  isLoading:boolean;
  isbnsString:string;
  accounts : account;
}

const initialState: newIsbnState = {
  err: "",
  status: "",
  message: "",
  statusCode: 0,
  isbns: [],
  isbnsString:"",
  selectedISBNS:[],
  selectedISBNSList:[],
  selectedTitles:[],
  selectedTitlesList:[],
  isLoading: false,
  accounts:{
    accounts:[],
    isLoading:false,
    status:0,
    message:"",
    page:1,
    limit:10,
    searchStr:"",
    accountNumberScrollPosition:0,
    accountHasMore:true
  }
};

export const fetchIsbnList = createAsyncThunk(
  "isbn/isbn_list",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHISBNSLIST,data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const fetchAccounts = createAsyncThunk(
  "isbn/fetchAccounts",
  async (data:{searchStr:string, page:number,limit:number,oldAccounts:any}, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FETCHACCOUNTS,data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const newIsbnSlice = createSlice({
  name: "isbn",
  initialState,
  reducers: {
    UpdateSelectedISBNS:(state,action)=>{
      state.selectedISBNS=action.payload
    },
    UpdateSelectedISBNSList:(state,action)=>{
      state.selectedISBNSList=action.payload
    },
    UpdateSelectedTitles:(state,action)=>{
      state.selectedTitles=action.payload
    },
    UpdateSelectedTitlesList:(state,action)=>{
      state.selectedTitlesList=action.payload
    },
    setIsbnString: (state, action) => {
      if (state.isbns) state.isbnsString = action.payload;
    },
    updateAccountSearchStr: (state,action) => {
      state.accounts.searchStr = action.payload
    },
    updateAccountPage:(state) => {
      state.accounts.page += 1;
    },
    updateScrollPosition:(state,action) => {
      state.accounts.accountNumberScrollPosition = action.payload
    },
    updateSearchStr:(state,action) => {
      state.accounts.searchStr = action.payload;
    },
    emptyAccountsScrollPosition:(state) => {
      state.accounts.accountNumberScrollPosition = initialState.accounts.accountNumberScrollPosition;
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchIsbnList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIsbnList.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.isbns = action.payload.data
      })
      .addCase(fetchIsbnList.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        if (state.isbns) {
          state.statusCode = action.payload.status;
          state.message = action.payload.data?.message ?? "";
        }
      });

      builder
      .addCase(fetchAccounts.pending, (state) => {
        state.accounts.isLoading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<any>) => {
        state.accounts.isLoading = false;
        state.accounts.accountHasMore = action.payload.data.hasMore
        if(state.accounts.accounts)
          state.accounts.accounts.push(...action.payload.data.data);
        }
      )
      .addCase(fetchAccounts.rejected, (state, action: PayloadAction<any>) => {
        state.accounts.isLoading = false;
        if (state.accounts) {
          state.accounts.status = action.payload.status;
          state.accounts.message = action.payload.data?.message ?? "";
        }
      });
  },
});

export const {
  UpdateSelectedISBNSList,
  UpdateSelectedISBNS,
  UpdateSelectedTitlesList,
  UpdateSelectedTitles,
  setIsbnString,
  updateAccountSearchStr,
  updateAccountPage,
  updateScrollPosition,
  updateSearchStr,
  emptyAccountsScrollPosition
} = newIsbnSlice.actions;

export const ISBNData = (state: RootState) => state.isbnReducer.isbns;

export default newIsbnSlice.reducer;
