import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

interface MANAGINGEDITORdatainterface {
  MANAGING_EDITOR:string;
}

interface managingEditorState {
  data: MANAGINGEDITORdatainterface[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  managingEditor?:string[] | any;
  managingEditorList?:string[];
}
const initialState: managingEditorState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  managingEditor:[],
  managingEditorList:[],
};

export const FetchManagingEditor = createAsyncThunk(
  "FetchManagingEditor",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FetchManagingEditor,data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const managingEditorSlice = createSlice({
  name: "managingEditorData",
  initialState,
  reducers: {
    UpdatemanagingEditor:(state,action)=>{
      state.managingEditor=action.payload
    },
    UpdatemanagingEditorList:(state,action)=>{
      state.managingEditorList=action.payload
    },
            emptyManagingEditorReducer:(state) => {
              state.data = initialState.data;
              state.status = initialState.status;
              state.error = initialState.error;
              state.statusCode = initialState.statusCode;
              state.isLoading = initialState.isLoading;
              state.managingEditor = initialState.managingEditor;
              state.managingEditorList = initialState.managingEditorList;
            }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchManagingEditor.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchManagingEditor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(FetchManagingEditor.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdatemanagingEditor,UpdatemanagingEditorList,emptyManagingEditorReducer}=managingEditorSlice.actions
export default managingEditorSlice.reducer