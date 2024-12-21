import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/API";
import { MdRowing } from "react-icons/md";
import { isbnsData, OptionType } from "./ISBNSReducer";
import { TitleListItem } from "./TitleListreducer";
import { eanObj } from "./EansReducer";

interface FullTitleObj {}
export interface segDetailsInterface {
  FULL_TITLE: string;
  AUTHOR_1: string;
  EAN: string;
  GROUP_1: string;
  FORMAT: string;
  COMPETITIVE_TITLES?: string;
  FULL_TITLES?: [];
  PRINT_RUN?: number | string;
  US_PRICE?: number;
  ANNOUNCED_1ST_PRINTING__BEST?: number | string;
  PAGES?: number;
  TRIMWIDTH?: string;
  TRIMLENGTH?: string;
  totlaEst:number;
}

export interface otisRecordInterface {
  account_id:string | null,
  account_name: string | null;
  account_number: string | null;
  pubGoal: string | null;
  mtgPrint: string | null;
  currentEst: string | null;
  initOrd: string | null;
  suppEst: string | null;
  compInit: string | null;
  compGross: string | null;
  compNet: string | null;
  retPercentage: string | null;
  Cpos_4wk: string | null;
  Cpos_8wk: string | null;
  Cpos_LTD: string | null;
}

interface UpdateTableDataPayload {
  rowIndex: number;
  cellName: keyof otisRecordInterface;
  value: any;
}
interface OTISDataInterface {
  _id: string;
  SEGTitle: string;
  SEGINVNotes: string;
  SEGOTISRecords: otisRecordInterface[];
  segDetails: segDetailsInterface;
  eanSelectedValue: OptionType | null;
  eanNumberValue: OptionType | null;
  selectedOtisSummary:TitleListItem;
}

interface OTISState {
  data: OTISDataInterface;
  status: string;
  statusCode: number;
  error: string | null;
  isLoading: boolean;
  selectedSeg: string;
  startingRows: number;
  totalPubGoal?: number;
  updateOtis: {
    status: number;
    error: string;
    message: string;
    isLoading: boolean;
  };
  submitButtonDisabled: boolean;
}

const OTISInitialObject: otisRecordInterface = {
  account_id:null,
  account_name: null,
  account_number: null,
  pubGoal: null,
  mtgPrint: null,
  currentEst: null,
  initOrd: null,
  suppEst: null,
  compInit: null,
  compGross: null,
  compNet: null,
  retPercentage: null,
  Cpos_4wk: null,
  Cpos_8wk: null,
  Cpos_LTD: null,
};

const initialState: OTISState = {
  data: {
    _id: "",
    SEGOTISRecords: [],
    segDetails: {
      FULL_TITLE: "",
      AUTHOR_1: "",
      EAN: "",
      GROUP_1: "",
      FORMAT: "",
      totlaEst: 0,
    },
    SEGTitle: "",
    SEGINVNotes: "",
    eanSelectedValue: null,
    eanNumberValue:null,
    selectedOtisSummary:{
      _id:"",
      EAN:0,
      SEASON:"",
      GROUP_1:"",
      TESTIMPRINTFROMHNA:"",
      FULL_TITLE:"",
      AUTHOR_1:"",
      PUB_DATE:"",
      RELEASE_DATE:"",
      FORMAT:"",
      US_PRICE:0,
    }
  },
  startingRows: 5,
  status: "",
  error: null,
  statusCode: 0,
  isLoading: false,
  selectedSeg: "",
  updateOtis: {
    error: "",
    message: "",
    status: 0,
    isLoading: false,
  },
  totalPubGoal: 0,
  submitButtonDisabled: true,
};

// export const FetchOTISRecord = createAsyncThunk(
//   "FetchOTISRecord",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const url = API.FETCHOTISRECORD;
//       const response = await axios.post(url, data);
//       return response;
//     } catch (err: any) {
//       return rejectWithValue(err.response);
//     }
//   }
// );



const DetailPageSlice = createSlice({
  name: "DetailPage",
  initialState,
  reducers: {
    setSelectedSeg: (state, action) => {
      state.selectedSeg = action.payload;
    },
    updateStartingRows: (state, action) => {
      state.startingRows = state.startingRows + action.payload;
    },
    updateTableData: (state, action: PayloadAction<UpdateTableDataPayload>) => {
      if (
        (action.payload.value?.length <= 0 ||
          isNaN(Number(action.payload.value))) &&
        action.payload.cellName !== "account_name" &&
        action.payload.cellName !== "account_number" &&
        action.payload.cellName !== "account_id"
      ) {
        if (isNaN(Number(action.payload.value))) {
          if (action.payload.value?.length < 1)
            state.data.SEGOTISRecords[action.payload.rowIndex][
              action.payload.cellName
            ] = null;
          else
            state.data.SEGOTISRecords[action.payload.rowIndex][
              action.payload.cellName
            ] = action.payload.value.slice(0, -1);
        } else
          state.data.SEGOTISRecords[action.payload.rowIndex][
            action.payload.cellName
          ] = null;
      } else if (
        Object.keys(action.payload.value).length <= 0 &&
        ( 
          action.payload.cellName === "account_name" ||
          action.payload.cellName === "account_number" ||
          action.payload.cellName === "account_id"
        )
      ) {
        state.data.SEGOTISRecords[action.payload.rowIndex][
          action.payload.cellName
        ] = null;
      } else{
      
        state.data.SEGOTISRecords[action.payload.rowIndex][
          action.payload.cellName
        ] = action.payload.value;
      }
    },
    emptySelectedOTISData: (state) => {
      state.data = initialState.data;
      state.updateOtis = initialState.updateOtis;
    },
    emptyUpdatedOtisStatus: (state) => {
      state.updateOtis.status = initialState.updateOtis.status;
    },
    addRowInOTISRecords: (state) => {
      state.data.SEGOTISRecords.push(OTISInitialObject);
    },
    removeOTISRow: (state, action) => {
      state.data.SEGOTISRecords.splice(action.payload, 1);
    },
    updateSubmitBtn: (state, action) => {
      state.submitButtonDisabled = action.payload;
    },
    updateSegTitle: (state, action) => {
      state.data.SEGTitle = action.payload;
    },
    updateSegINVNotes: (state, action) => {
      state.data.SEGINVNotes = action.payload;
    },
    updateEanSelectedValue: (state, action) => {
      state.data.eanSelectedValue = action.payload;
    },
    updateEanNumberValue: (state, action) => {
      state.data.eanNumberValue = action.payload;
    },
    emptySelectedOtisSummary: (state) => {
      state.data.selectedOtisSummary = initialState.data.selectedOtisSummary;
    },
      // emptyUpdateSelectedOtisREcord:(state)=>{
    //   state.data.SEGINVNotes=initialState.data.SEGINVNotes
    //   state.data.eanSelectedValue=initialState.data.eanSelectedValue
    //   state.data.SEGTitle=initialState.data.SEGTitle
    //   state.data.selectedOtisSummary.AUTHOR_1=initialState.data.selectedOtisSummary.AUTHOR_1
    //   state.data.selectedOtisSummary.GROUP_1=initialState.data.selectedOtisSummary.GROUP_1
    //   state.data.selectedOtisSummary.FORMAT=initialState.data.selectedOtisSummary.FORMAT
    // }
  },
//   extraReducers(builder) {
//     builder
//       .addCase(FetchOTISRecord.pending, (state) => {
//         state.isLoading = true;
//         state.status = "Loading";
//       })
//       .addCase(FetchOTISRecord.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.status = "success";
//         state.data = action.payload.data;
//       })
//       .addCase(FetchOTISRecord.rejected, (state) => {
//         state.isLoading = false;
//         state.status = "Failed";
//         state.error = "Error";
//       });

//     builder
//       .addCase(updateSelectedOTISRecord.pending, (state) => {
//         state.submitButtonDisabled = true;
//         state.updateOtis.isLoading = true;
//         state.isLoading = true;
//       })
//       .addCase(updateSelectedOTISRecord.fulfilled, (state, action) => {
//         state.updateOtis.isLoading = false;
//         state.isLoading = false;
//         state.updateOtis.message = action.payload.data.message ?? "Succcess";
//         state.updateOtis.status = action.payload.status;
//       })
//       .addCase(
//         updateSelectedOTISRecord.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.isLoading = false;
//           state.updateOtis.isLoading = false;
//           state.status = action.payload.status;
//         }
//       );

//     builder
//       .addCase(fetchSelectedSegSummary.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(fetchSelectedSegSummary.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data.selectedOtisSummary = action.payload.data;
//       })
//       .addCase(fetchSelectedSegSummary.rejected, (state,action:PayloadAction<any>) => {
//         state.isLoading = false;
//       })
//   },
});

export const {
  updateSegINVNotes,
  updateEanSelectedValue,
  updateEanNumberValue,
  updateSegTitle,
  updateSubmitBtn,
  addRowInOTISRecords,
  setSelectedSeg,
  updateTableData,
  emptySelectedOTISData,
  emptyUpdatedOtisStatus,
  removeOTISRow,
  emptySelectedOtisSummary
} = DetailPageSlice.actions;
export default DetailPageSlice.reducer;
