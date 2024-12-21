import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";
import { downloadPdfData } from "../../common-components/commonFunctions";

interface Detailinterface {
  imprint: any;
  EDITOR:any;
  EAN:any,
  Season: any;
  ISBN: any;
  AUTHOR_1:any;
  FULL_TITLE: any;
  RELEASE_DATE: any;
  PUBMONTH: any;
  PUB_DATE: any;
  AGE_RANGE: any;
  US_PRICE: any;
  UK_PRICE: any;
  CANADIAN_PRICE: any;
  ANNOUNCED_1ST_PRINTING__BEST: any;
  SERIES: any;
  FORMAT: any;
  // TRIM SIZE: any;
  PAGES: any;
  INSERTS_ILLUS: any;
  BISAC1_DESC: any;
  BISAC2_DESC: any;
  BISAC3_DESC: any;
  DESCRIPTION: any;
  AUTHOR_BIO: any;
  PUBLICITY: any;
  CATEGORY1: any;
  CATEGORY2: any;
  CATEGORY3: any;
  MARKETING_BULLETS__FACT_SHEET: any;
  IMAGE_URL: any;
}

interface DetailState {
  data: Detailinterface;
  status: string;
  statusCode: number;
  error: string | null;
  selectedDetail: string;
  isLoading: boolean;
}
const initialState: DetailState = {
  data: {
    EAN:"",
    AUTHOR_1:"",
    imprint: null,
    Season: null,
    ISBN: null,
    FULL_TITLE: null,
    RELEASE_DATE: null,
    PUBMONTH: null,
    PUB_DATE: null,
    AGE_RANGE: null,
    US_PRICE: null,
    UK_PRICE: null,
    CANADIAN_PRICE: null,
    ANNOUNCED_1ST_PRINTING__BEST: null,
    EDITOR: null,
    SERIES: null,
    FORMAT: null,
    PAGES: null,
    INSERTS_ILLUS: null,
    BISAC1_DESC: null,
    BISAC2_DESC: null,
    BISAC3_DESC: null,
    DESCRIPTION: null,
    AUTHOR_BIO: null,
    PUBLICITY: null,
    CATEGORY1: null,
    CATEGORY2: null,
    CATEGORY3: null,
    MARKETING_BULLETS__FACT_SHEET: null,
    IMAGE_URL: null,
  },
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedDetail: "",
};
export const FetchDetailsRecord = createAsyncThunk(
  "FetchDetailsRecord",
  async (data: any, { rejectWithValue }) => {
    try {
      const url = `${API.FETCHDETAILSRECORD}/${data.id}`;
      const response = await axios.get(url);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
export const PostpdfData=createAsyncThunk("Postpdf",async(data:any,{rejectWithValue})=>{
  try{
    const response=await axios.get( `${API.DOWNLOADPDF}/${data.id}`,{responseType:"blob"})
    return response;
  }catch(err:any){
    return rejectWithValue(err.response)
  }
})
// export const handleDownloadPdf = async () => {
//   try {
//     const response = await axios.post('/api/pdf', {
//       responseType: 'arraybuffer', 
//     });
//     downloadPdfData(response.data);
//   } catch (error) {
//     console.error('Error downloading PDF:', error);
//   }
// };

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.selectedDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchDetailsRecord.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(FetchDetailsRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload.data;
        console.log( action.payload.data,"detailss")
      })
      .addCase(FetchDetailsRecord.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      })
      .addCase(PostpdfData.pending, (state) => {
        state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(PostpdfData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        
        state.data = action.payload.data;
        console.log( action.payload.data,"pdffff")
      })
      .addCase(PostpdfData.rejected, (state) => {
        state.isLoading = false;
        state.status = "Failed";
        state.error = "Error";
      });
  },
});

export const {setDetails} = bookSlice.actions;

export default bookSlice.reducer;
