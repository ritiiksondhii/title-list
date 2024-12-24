import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";

interface Editordatainterface {
  EDITOR:string;
}

interface EditorState {
  data: Editordatainterface[];
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  Editor?:string[] | any;
  EditorList?:string[];
}
const initialState: EditorState = {
  data: [],
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  Editor:[],
  EditorList:[],
};

export const FetchEditor = createAsyncThunk(
  "FetchEditor",
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.FetchEditor,data);
      return response;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("error occurred");
    }
  }
);

const EditorSlice = createSlice({
  name: "EditorData",
  initialState,
  reducers: {
    UpdateEditor:(state,action)=>{
      state.Editor=action.payload
    },
    UpdateEditorList:(state,action)=>{
      state.EditorList=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(FetchEditor.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchEditor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(FetchEditor.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});
export const { UpdateEditor,UpdateEditorList}=EditorSlice.actions
export default EditorSlice.reducer