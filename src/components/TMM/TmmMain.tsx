import React, { useEffect, useState } from "react";
import { CommonDataTable } from "../../common-components/common-material-react-table/CommonMaterialReactTable";
import { TmmRecords } from "../../constants/tableConstants/tableHeaders";
import InputSelect from "./InputField";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  FetchTitleListRecord,
  setSelectedRowIndex,
  UpdatePagination,
  emptyTitleListPage
} from "../../redux/reducers/TitleListreducer";
import { useNavigate } from "react-router-dom";
import { emptySeasonReducer, FetchSeason,UpdateSelectedSeason,UpdateSelectedSeasonList } from "../../redux/reducers/SeasonReducer";
import SelectList, { components } from "react-select";
import { emptyDivisionReducer, fetchDivision, UpdateSelectedDivision, UpdateSelectedDivisionList } from "../../redux/reducers/DivisionReducer";
import { emptyImprintReducer, fetchImprint, UpdateSelectedImprint, UpdateSelectedImprintList } from "../../redux/reducers/ImprintReducer";
import { Controller, useForm } from "react-hook-form";
import { ScrollTableData } from "../../common-components/common-material-react-table/function";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import { emptyReducerStates, fetchIsbnList, ISBNData, setIsbnString, UpdateSelectedISBNS, UpdateSelectedISBNSList, UpdateSelectedTitles, UpdateSelectedTitlesList } from "../../redux/reducers/ISBNSReducer";
import Loading from "../../common-components/Loader";
import { formatCurrency } from "../../common-components/commonFunctions";
import Alogo from '../../assets/images/logo.png'
import { PostpdfData, setDetails } from "../../redux/reducers/DetailPageReducer";
import { FaDownload, FaEye } from "react-icons/fa";
import {
  Autocomplete,
  Checkbox,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { emptyManagingEditorReducer, FetchManagingEditor, UpdatemanagingEditor, UpdatemanagingEditorList } from "../../redux/reducers/managingEditorReducer";
import { emptyEditorReducer, FetchEditor, UpdateEditor, UpdateEditorList } from "../../redux/reducers/editorReducer";
import { emptyBisacStatusReducer, FetchbisacStatus, UpdatebisacStatus, UpdatebisacStatusList } from "../../redux/reducers/BisanStatusReducer";
import { emptyAuthorReducer, FetchAuthor1, UpdateAuthor1, UpdateAuthor1List } from "../../redux/reducers/AUTHOR1Reducer";

interface OptionType {
  value: string;
  label: string;
}

interface FormValues {
  season: string[];
  division: string[];
  imprint: string[];
  managingEditor: string[];
  editor: string[];
  bisac_status:string[];
  author:OptionType[];
  title:OptionType[];
  isbn:OptionType[];
}
const TmmMain = () => {
  const { control, handleSubmit, watch, register, setValue } = useForm<FormValues>();
  // const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(0);
  const TitleListData = useSelector((state: RootState) => state.TitleListreducer.data);
  const page = useSelector((state: RootState) => state.TitleListreducer.page);
  const limit = useSelector((state: RootState) => state.TitleListreducer.limit);
  const isLoading=useSelector((state:RootState)=>state.TitleListreducer.isLoading)
  const hasMore = useSelector((state:RootState) => state.TitleListreducer.hasMore)
  const isbnLimit = 15;
  const [isbnSkip, setIsbnSkip] = useState(0);
  const isbns = useSelector(ISBNData);
  const isbnsString = useSelector(
    (state: RootState) => state.isbnReducer.isbnsString
  );
  const [isbn_number_options, set_ISBN_NUMBER_OPTION] = useState<OptionType[]>(
    []
  );
  const [isbn_title_options, set_ISBN_TITLE_OPTION] = useState<OptionType[]>([]);

  const authorsData = useSelector((state:RootState) => state.AUTHOR1Reducer.data);

  const authorOptions: OptionType[] = authorsData.map((author: any) => ({
    value: author.AUTHOR_1 ?? "",
    label: author.AUTHOR_1 ?? "",
  }));
// setting the values of all matched isbns
    useEffect(() => {
      if (isbns?.length) {
        set_ISBN_NUMBER_OPTION(
          isbns.map((isbn : any) => ({
            value: isbn.ISBN ?? "",
            label: isbn.ISBN ?? "",
          })) 
        );
        set_ISBN_TITLE_OPTION(
          isbns.map((isbn : any) => ({
            value: isbn.ISBN ?? "",
            label: isbn.FULL_TITLE ?? "",
          }))
        );
      }
    }, [isbns]);
  


  const selectedRowIndex = useSelector(
    (state: RootState) => state.TitleListreducer.selectedRowIndex
  );
  const selectedSeason = useSelector(
    (state: RootState) => state.SeasonReducer.selectedSeason
  );
  const selectedSeasonlist = useSelector(
    (state: RootState) => state.SeasonReducer.selectedSeasonList
  );

  const selectedDivision = useSelector(
    (state: RootState) => state.DivisionReducer.selectedDivision
  );
  const selectedDivisionlist = useSelector(
    (state: RootState) => state.DivisionReducer.selectedDivisionList
  );

  const selectedImprint = useSelector(
    (state: RootState) => state.ImprintReducer.selectedImprint
  );
  const selectedImprintlist = useSelector(
    (state: RootState) => state.ImprintReducer.selectedImprintList
  );

  const selectedIsbnsList = useSelector((state:RootState) => state.isbnReducer.selectedISBNSList)
  const selectedTitlesList = useSelector((state:RootState) => state.isbnReducer.selectedTitlesList)
  const selectedAuthorsList = useSelector((state:RootState) => state.AUTHOR1Reducer.Author1List);
  const selectedAuthors = useSelector((state:RootState) => state.AUTHOR1Reducer.Author1);

  const selectedIsbns = useSelector((state:RootState) => state.isbnReducer.selectedISBNS)
  const selectedManagingEditors = useSelector((state:RootState) => state.managingEditorReducer.managingEditor)
  const selectedEditors = useSelector((state:RootState) => state.editorReducer.Editor)
  const selectedBisacStatus = useSelector((state:RootState) => state.BisanStatusReducer.bisacStatus)

  const navigate = useNavigate();
  const SeasonData = useSelector(
    (state: RootState) => state.SeasonReducer.data
  );
  const ManagingEditorData = useSelector(
    (state: RootState) => state.managingEditorReducer.data
  );

  const editorData = useSelector(
    (state: RootState) => state.editorReducer.data
  );

  const bisacStatusData = useSelector(
    (state: RootState) => state.BisanStatusReducer.data
  );

  const divisionData = useSelector(
    (state: RootState) => state.DivisionReducer.data
  );
  const imprintData = useSelector(
    (state: RootState) => state.ImprintReducer.data
  );
  const bgElement = useSelector(
    (state: RootState) => state.dropdownReducer.bgElement
  );
  const dispatch = useDispatch<AppDispatch>();
  const[buttonDisabled,setButtonDisabled]=useState(true)
  const TitleListdata=useSelector((state:RootState)=>state.TitleListreducer.data)

// useEffect(()=>{
//   if(selectedSeasonlist?.length || selectedDivisionlist?.length || selectedImprintlist?.length || selectedIsbnsList?.length || selectedTitlesList?.length ){
//     setButtonDisabled(false)
//   }
//   // return ()=>{
//   //  setButtonDisabled(true)
//   // }
  
// },[selectedSeasonlist,selectedDivisionlist,selectedImprintlist,selectedIsbnsList,selectedTitlesList])

useEffect(() => {
  const isAllFieldsEmpty =
    !(selectedSeasonlist?.length ?? 0) &&
    !(selectedDivisionlist?.length ?? 0) &&
    !(selectedImprintlist?.length ?? 0) &&
    !(selectedIsbnsList?.length ?? 0) &&
    !(selectedTitlesList?.length ?? 0) && 
    !(selectedManagingEditors?.length??0 ) &&
    !(selectedEditors?.length ??0) &&
    !(selectedBisacStatus?.length??0);
  setButtonDisabled(isAllFieldsEmpty);
}, [selectedSeasonlist, selectedDivisionlist, selectedImprintlist, selectedIsbnsList, selectedTitlesList,selectedManagingEditors,selectedEditors,selectedBisacStatus]);
  useEffect(() => {
    if(selectedSeasonlist?.length){
      setValue("season",selectedSeasonlist)
    }
    if(selectedDivisionlist?.length){
      setValue("division",selectedDivisionlist)
    }
    if(selectedImprintlist?.length){
      setValue("imprint",selectedImprintlist)
    }
    if(selectedIsbnsList?.length){
      setValue("isbn",selectedIsbnsList)
    }

    if(selectedTitlesList?.length){
      setValue("title",selectedTitlesList)
    }
    if(selectedManagingEditors?.length){
      setValue("title",selectedManagingEditors)
    }
    if(selectedEditors?.length){
      setValue("title",selectedEditors)
    }
    if(selectedBisacStatus?.length){
      setValue("title",selectedBisacStatus)
    }
    return () => {
      dispatch(emptyTitleListPage())
      dispatch(emptyReducerStates())
      dispatch(emptyAuthorReducer())
      dispatch(emptySeasonReducer())
      dispatch(emptyDivisionReducer());
      dispatch(emptyImprintReducer())
      dispatch(emptyManagingEditorReducer())
      dispatch(emptyEditorReducer())
      dispatch(emptyBisacStatusReducer())
    }
  }, []);

  const handleFilterClear=(e:any)=>{
    e.preventDefault()
    setValue("season",[])
    setValue("division",[])
    setValue("imprint",[])
    setValue("isbn",[])
    setValue("title",[])
    setValue("managingEditor",[])
    setValue("editor",[])
    setValue('bisac_status',[])

    // const seasonData = Array.isArray(watch("season"))
    //   ? watch("season").map((data) => data.value)
    //   : [];
    const division =
    //  Array.isArray(watch("division"))
      // ? 
      watch("division")
      // .map((data) => data.value)
      // : [];

    const isbns = 
    // Array.isArray(watch("isbn"))
    // ? 
    watch("isbn")
    // .map((data) => data.value)
    // : [];

    const imprint = 
    // Array.isArray(watch("imprint"))
    //   ? 
      watch("imprint")
      // .map((data) => data.value)
      // : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: [],
        Division: [],
        Imprint: [],
        TitleListIds:TitleListIds,
        managingEditor:[],
        editors:[],
        bisacStatus:[],
        author:[],
        isbns:[],
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns,
        prevManagingEditors: selectedManagingEditors,
        prevEditors: selectedEditors,
        prevBisacStatus: selectedBisacStatus,
        prevAuthor: selectedAuthors
      })
    );
    
    dispatch(UpdateSelectedISBNS([]))
    dispatch(UpdateSelectedTitles([]))
    dispatch(UpdateSelectedSeason([]))
    dispatch(UpdateSelectedDivision([]))
    dispatch(UpdateSelectedImprint([]))
    dispatch(UpdatemanagingEditor([]))
    dispatch(UpdateAuthor1([]))
    dispatch(UpdatebisacStatus([]))
    dispatch(UpdateEditor([]))

    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    dispatch(UpdateSelectedImprintList(watch('imprint')))
    dispatch(UpdateAuthor1List(watch("author")))
    dispatch(UpdatebisacStatusList(watch("bisac_status")))
    dispatch(UpdateEditorList(watch("editor")))
    dispatch(UpdatemanagingEditorList(watch("managingEditor")))
  }


  useEffect(() => {
    const seasonData = 
    // Array.isArray(watch("season"))
    //   ? 
      watch("season")
      // .map((data) => data.value)
      // : [];

    const division =
    //  Array.isArray(watch("division"))
    //   ? 
      watch("division")
      // .map((data) => data.value)
      // : [];

    const isbns =
     Array.isArray(watch("isbn"))
    ? 
    watch("isbn")
    .map((data) => data.value)
    : [];

    const authors =
     Array.isArray(watch("author"))
    ? 
    watch("author")
    .map((data) => data.value)
    : [];


    const imprint = 
    // Array.isArray(watch("imprint"))
    //   ? 
      watch("imprint")
      // .map((data) => data.value)
      // : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: seasonData,
        Division: division,
        Imprint: imprint,
        managingEditor:watch("managingEditor"),
        editors:watch("editor"),
        bisacStatus:watch("bisac_status"),
        author:authors,
        TitleListIds:TitleListIds,
        isbns:isbns,
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns,
        prevManagingEditors: selectedManagingEditors,
        prevEditors: selectedEditors,
        prevBisacStatus: selectedBisacStatus,
        prevAuthor: selectedAuthors
      })
    );
    dispatch(UpdateSelectedISBNS(isbns))
    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    
    dispatch(UpdateAuthor1(authors))
    dispatch(UpdateAuthor1List(watch("author")))
    
    dispatch(UpdatebisacStatus(watch("bisac_status")))
    dispatch(UpdatebisacStatusList(watch("bisac_status")))

    dispatch(UpdateEditor(watch("editor")))
    dispatch(UpdateEditorList(watch("editor")))
    
    dispatch(UpdatemanagingEditor(watch("managingEditor")))
    dispatch(UpdatemanagingEditorList(watch("managingEditor")))

    dispatch(UpdateSelectedTitles(isbns))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    
    dispatch(UpdateSelectedSeason(seasonData))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    
    dispatch(UpdateSelectedDivision(division))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    
    dispatch(UpdateSelectedImprint(imprint))
    dispatch(UpdateSelectedImprintList(watch('imprint')))

  }, [page]);

  useEffect(() => {
    const seasonData =
    //  Array.isArray(watch("season"))
    //   ? 
      watch("season")
      // .map((data) => data.value)
      // : [];

    const division = 
    // Array.isArray(watch("division"))
    //   ? 
      watch("division")
      // .map((data) => data.value)
      // : [];

    const isbns = 
    Array.isArray(watch("isbn"))
    ? 
    watch("isbn")
    .map((data) => data.value)
    : [];

    const authors = 
    Array.isArray(watch("author"))
    ? 
    watch("author")
    .map((data) => data.value)
    : [];

    const imprint = 
    // Array.isArray(watch("imprint"))
    //   ? 
      watch("imprint")
      // .map((data) => data.value)
      // : [];
      
    const managingEditors = watch("managingEditor")
    const bisacStatus = watch("bisac_status")
    const editors = watch("editor")

    dispatch(FetchbisacStatus({
      seasons:seasonData,
      divisions:division,
      isbns:isbns,
      imprint:imprint,
      managingEditors:managingEditors,
      authors:authors,
      bisacStatus:bisacStatus,
      editors:editors
    })); 

    dispatch(FetchAuthor1({
      seasons:seasonData,
      divisions:division,
      isbns:isbns,
      imprint:imprint,
      managingEditors:managingEditors,
      authors:authors,
      bisacStatus:bisacStatus,
      editors:editors
    })); 

      dispatch(FetchEditor({
        seasons:seasonData,
        divisions:division,
        isbns:isbns,
        imprint:imprint,
        managingEditors:managingEditors,
        authors:authors,
        bisacStatus:bisacStatus,
        editors:editors
      }));  
      dispatch(FetchManagingEditor({
        seasons:seasonData,
        divisions:division,
        isbns:isbns,
        imprint:imprint,
        managingEditors:managingEditors,
        authors:authors,
        bisacStatus:bisacStatus,
        editors:editors
      }));  

    dispatch(fetchDivision({
      seasons:seasonData,
      divisions:division,
      isbns:isbns,
      imprint:imprint,
      managingEditors:managingEditors,
      authors:authors,
      bisacStatus:bisacStatus,
      editors:editors
    }));
    dispatch(FetchSeason({
      seasons:seasonData,
      divisions:division,
      isbns:isbns,
      imprint:imprint,
      managingEditors:managingEditors,
      authors:authors,
      bisacStatus:bisacStatus,
      editors:editors
    }));
    dispatch(fetchImprint({
      seasons:seasonData,
      divisions:division,
      isbns:isbns,
      imprint:imprint,
      managingEditors:managingEditors,
      authors:authors,
      bisacStatus:bisacStatus,
      editors:editors
    }));
    dispatch(
      fetchIsbnList({
        seasons:seasonData,
        managingEditors:managingEditors,
        authors:authors,
        bisacStatus:bisacStatus,
        editors:editors,
        divisions:division,isbns:isbns,imprint:imprint,
        limit: isbnLimit,
        skip: isbnLimit * isbnSkip,
        selectedData: watch("isbn")?.length
          ? watch("isbn")
          .map((isbn) => isbn.label)
          : [],
      })
    );

  },[watch("season"),watch("division"),watch("imprint"),watch("isbn"), watch("author"), watch("bisac_status"), watch("editor"), watch("managingEditor")])

  const options = SeasonData.map((SeasonData) => (
    // {
    // value: SeasonData.SEASON ?? "",
    // label: 
    SeasonData.SEASON ?? ""
  // }
)
);

const managingEditorOptions = ManagingEditorData.map((managingEditor) => (
  // {
  // value: SeasonData.SEASON ?? "",
  // label: 
  managingEditor.MANAGING_EDITOR ?? ""
// }
)
);

const editorOptions = editorData.map((editor) => (
  // {
  // value: SeasonData.SEASON ?? "",
  // label: 
  editor.EDITOR ?? ""
// }
)
);

const bisacStatusOptions = bisacStatusData.map((bisacStatus) => (
  // {
  // value: SeasonData.SEASON ?? "",
  // label: 
  bisacStatus.BISAC_STATUS ?? ""
// }
)
);

  const DivisionOption = 
  divisionData.map((Division) => (
    // {
  //   value: Division.division ?? "",
  //   label: 
    Division.division ?? ""
  // }
));
  const ImprintOption = 
  imprintData.map((imprint) => (
    // {
  //   value: imprint.IMPRINT,
  //   label:
     imprint.IMPRINT
  // }
));

  const handleRowClick = (row: any, index: number) => {
    dispatch(setSelectedRowIndex(index));
    dispatch(setDetails(row._id));
    navigate(`/details/${row._id}`);
  };
  useEffect(() => {
    if (TitleListData && TitleListData.length > 0 && selectedRowIndex == 0) {
      dispatch(setSelectedRowIndex(0));
      dispatch(setDetails(TitleListData[0]._id));
    }
  }, [TitleListData]);

  const changeIsbnInfo = (event: any) => {
    // if(Array.isArray(event.target.value))
    //   {
    // setting the isbn number if isbn title changed
    if (event.target.name === "title") {
      const titleIsbns = watch("title").map((title: any) => title.value);
      const isbnFilteredData =
        isbn_number_options?.filter((isbn) =>
          titleIsbns.includes(isbn.value)
        ) || [];
      setValue("isbn", isbnFilteredData);
    }
    // setting the isbn title if isbn number is changed
    else if (event.target.name === "isbn") {
      const isbnsList = watch("isbn").map((isbn: any) => isbn.value);
      const titleFilteredData =
        isbn_title_options?.filter((title) =>
          isbnsList.includes(title.value)
        ) || [];
      setValue("title", titleFilteredData);
    }
      handleTitleListRecordsFilterFetch()
    // }
  };

  const handleTitleListRecordsFilterFetch = () => {
    const seasonData = 
    // Array.isArray(watch("season"))
    //   ? 
      watch("season")
      // .map((data) => data.value)
      // : [];

    const division = 
    // Array.isArray(watch("division"))
    //   ? 
      watch("division")
      // .map((data) => data.value)
      // : [];

    const isbns = 
    // Array.isArray(watch("isbn"))
    // ? 
    watch("isbn")
    // .map((data) => data.value)
    // : [];

    const imprint =
    //  Array.isArray(watch("imprint"))
    //   ? 
      watch("imprint")
      // .map((data) => data.value)
      // : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

      const authors =
      Array.isArray(watch("author"))
     ? 
     watch("author")
     .map((data) => data.value)
     : [];

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: seasonData,
        Division: division,
        Imprint: imprint,
        TitleListIds:TitleListIds,
        isbns:isbns,
        managingEditor:watch("managingEditor"),
        editors:watch("editor"),
        bisacStatus:watch("bisac_status"),
        author:authors,
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns,
        prevManagingEditors: selectedManagingEditors,
        prevEditors: selectedEditors,
        prevBisacStatus: selectedBisacStatus,
        prevAuthor: selectedAuthors
      })
    );
    dispatch(UpdateSelectedISBNS(isbns))
    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    
    dispatch(UpdateAuthor1(authors))
    dispatch(UpdateAuthor1List(watch("author")))
    
    dispatch(UpdatebisacStatus(watch("bisac_status")))
    dispatch(UpdatebisacStatusList(watch("bisac_status")))

    dispatch(UpdateEditor(watch("editor")))
    dispatch(UpdateEditorList(watch("editor")))
    
    dispatch(UpdatemanagingEditor(watch("managingEditor")))
    dispatch(UpdatemanagingEditorList(watch("managingEditor")))

    dispatch(UpdateSelectedTitles(isbns))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    
    dispatch(UpdateSelectedSeason(seasonData))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    
    dispatch(UpdateSelectedDivision(division))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    
    dispatch(UpdateSelectedImprint(imprint))
    dispatch(UpdateSelectedImprintList(watch('imprint')))
  };
  
  const tableStyles={
    sx:{
      "& thead":{
        position: "sticky",
        top: 0,
        zIndex: bgElement ? 0: 1,
      },
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between  bg-gradient-to-r from-red-500 w-full px-2 py-2 text-[20px] font-bold text-white">
        Title List
        <img src={Alogo} alt="" className="w-6 h-6" />
      </div>
      <div className="flex p-4 w-full">
        <div
          className={`flex flex-col gap-2 w-[20%] bg-white p-2 ${
            !bgElement ? "z-10" : ""
          } `}
        >
          <div className=" flex justify-center items-center ">
            <button
              disabled={buttonDisabled}
              className={` ${
                buttonDisabled ? "bg-red-400" : "bg-[#e31c23]"
              } text-white flex justify-center items-center
                         w-full   rounded-md cursor-pointer h-[38px] font-poppins font-semibold border border-none`}
               onClick={handleFilterClear}
            >
              {" "}
              Clear All Filter
            </button>
          </div>
          <div className="w-full">
                    <p className="text-[#e31c23] font-bold "> SEASON</p>
                    <div className=" grid grid-cols-1">
                    <Controller
                      name="season"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg"
                          renderValue={(selected: string[]) =>selected?.length > 1 ? "Multi Selected" : selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100,
                                overflow: 'auto',

                              },
                            },
                            MenuListProps: {
                              style: {
                                fontSize: '5px', 
                              },
                            },
                          }}
                          
                        >
                          {options.map((option) => (
                            <MenuItem  key={option} value={option} >
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText   
                              primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }} primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-[#e31c23] font-bold">DIVISION</p>
                    <div className="grid grid-cols-1">
                    <Controller
                      name="division"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                          renderValue={(selected: string[]) => selected?.length > 1 ? "Multi Selected" :selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100, 
                                overflow: 'auto',
                              },
                            },
                          }}
                        >
                          {DivisionOption.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText primary={option}
                                 primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                      {/* <Controller
                        name="division"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Select
                            placeholder="Select Division"
                              {...field}
                              options={DivisionOption}
                              isMulti
                              onChange={(e) => {
                                field.onChange(e)
                                handleTitleListRecordsFilterFetch()
                              }}
                              value={selectedDivisionlist}
                              className="border border-solid  w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                              components={{
                                MultiValueContainer: (props) => (
                                  <components.MultiValueContainer {...props}>
                                    <div className="flex">{props.children}</div>
                                  </components.MultiValueContainer>
                                ),
                              }}
                              styles={{
                                input: (provided) => ({
                                  ...provided,
                                  position: `${
                                    watch("division")?.length
                                      ? "relative"
                                      : "absolute"
                                  }`,
                                  left: 6,
                                  marginRight: "60px",
                                }),
                                multiValue: (provided) => ({
                                  ...provided,
                                  height: "30px",
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  minWidth: "none",
                                }),

                                valueContainer: (provided) => ({
                                  position: "relative",
                                  maxWidth: "28vw",
                                  width: "100%",
                                  paddingLeft: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  height: "40px",
                                  overflowX: "auto",
                                  "@media (max-width:600px)": {
                                    maxWidth: "55vw",
                                  },
                                }),
                                control: (provided) => ({
                                  display: "flex",
                                  // maxWidth:"37vw",
                                  // width:"510px",
                                  height: "40px",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }),
                                menuList:(provided) => ({
                                  // ...provided,
                                  maxHeight:"200px",
                                  overflow:'hidden',
                                  overflowY:"auto",
                                }),
                                clearIndicator:()=>({
                                  marginLeft: "20px",
                                  marginTop:"5px",
                                  color:"gray"
                                })
                              }}
                            />
                          );
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-[#e31c23] font-bold">IMPRINT</p>
                    <div className="w-full grid grid-cols-1">
                    <Controller
                      name="imprint"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                          renderValue={(selected: string[]) => selected?.length > 1 ? "Multi Selected" :selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100,
                                overflow: 'auto',
                              },
                            },
                          }}
                        >
                          {ImprintOption.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText primary={option}  
                              primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                      {/* <Controller
                        name="imprint"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Select
                            placeholder="Select Imprint"
                              {...field}
                              options={ImprintOption}
                              isMulti
                              onChange={(e) => {
                                field.onChange(e)
                                handleTitleListRecordsFilterFetch()
                              }}
                              value={selectedImprintlist}
                              className="border border-solid border-neutral-300 font-poppins rounded-lg 
                              w-full lg:text-[14px] sm:text-[10px]"
                              components={{
                                MultiValueContainer: (props) => (
                                  <components.MultiValueContainer {...props}>
                                    <div className="flex">{props.children}</div>
                                  </components.MultiValueContainer>
                                ),
                              }}
                              styles={{
                                input: (provided) => ({
                                  ...provided,
                                  position: `${
                                    watch("imprint")?.length
                                      ? "relative"
                                      : "absolute"
                                  }`,
                                  left: 6,
                                  marginRight: "60px",
                                }),
                                multiValue: (provided) => ({
                                  ...provided,
                                  height: "30px",
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                  minWidth: "none",
                                }),

                                valueContainer: (provided) => ({
                                  position: "relative",
                                  maxWidth: "28vw",
                                  width: "100%",
                                  paddingLeft: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                  height: "40px",
                                  overflowX: "auto",
                                  "@media (max-width:600px)": {
                                    maxWidth: "55vw",
                                  },
                                }),
                                control: (provided) => ({
                                  display: "flex",
                                  // maxWidth:"37vw",
                                  // width:"510px",
                                  height: "40px",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }),
                                menuList:(provided) => ({
                                  // ...provided,
                                  maxHeight:"200px",
                                  overflow:'hidden',
                                  overflowY:"auto",
                                }),
                                clearIndicator:()=>({
                                  marginLeft: "20px",
                                  marginTop:"5px",
                                  color:"gray"
                                })
                              }}
                            />
                          );
                        }}
                      /> */}
                    </div>
                  </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Managing Editor</p>
            <div className="w-full grid grid-cols-1">

            <Controller
                      name="managingEditor"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                          renderValue={(selected: string[]) => selected?.length > 1 ? "Multi Selected" : selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100,
                                overflow: 'auto',
                              },
                            },
                          }}
                        >
                          {managingEditorOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText primary={option} 
                                 primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }}/>
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />

            {/* <Controller
  name="managingEditor"
  control={control}
  defaultValue={[]}
  rules={{
    onChange: () => handleTitleListRecordsFilterFetch(),
  }}
  render={({ field }) => (
    <Autocomplete
      multiple
      options={managingEditorOptions}
      value={field.value}
      onChange={(event, newValue) => field.onChange(newValue)} // Updates the form state
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Managing Editor"
          placeholder="Select..."
          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })} // This includes the unique key
            className="m-1 font-poppins"
          />
        ))
      }
    />
  )}
/> */}

              {/* <Controller
                name="imprint"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      placeholder="Select Managing Editor"
                      {...field}
                      //   options={ImprintOption}
                      //   isMulti
                      //   onChange={(e) => {
                      //     field.onChange(e)
                      //     handleTitleListRecordsFilterFetch()
                      //   }}
                      //   value={selectedImprintlist}
                      className="border border-solid border-neutral-300 font-poppins rounded-lg 
                              w-full lg:text-[14px] sm:text-[10px]"
                      components={{
                        MultiValueContainer: (props) => (
                          <components.MultiValueContainer {...props}>
                            <div className="flex">{props.children}</div>
                          </components.MultiValueContainer>
                        ),
                      }}
                      styles={{
                        input: (provided) => ({
                          ...provided,
                          position: `${
                            watch("imprint")?.length ? "relative" : "absolute"
                          }`,
                          left: 6,
                          marginRight: "60px",
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "6px",
                          minWidth: "none",
                        }),

                        valueContainer: (provided) => ({
                          position: "relative",
                          maxWidth: "28vw",
                          width: "100%",
                          paddingLeft: "8px",
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                          overflowX: "auto",
                          "@media (max-width:600px)": {
                            maxWidth: "55vw",
                          },
                        }),
                        control: (provided) => ({
                          display: "flex",
                          // maxWidth:"37vw",
                          // width:"510px",
                          height: "40px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }),
                        menuList: (provided) => ({
                          // ...provided,
                          maxHeight: "200px",
                          overflow: "hidden",
                          overflowY: "auto",
                        }),
                        clearIndicator: () => ({
                          marginLeft: "20px",
                          marginTop: "5px",
                          color: "gray",
                        }),
                      }}
                    />
                  );
                }}
              /> */}
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Editor</p>
            <div className="w-full grid grid-cols-1">
            <Controller
                      name="editor"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                          renderValue={(selected: string[]) => selected?.length > 1 ? "Multi Selected" :selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100,
                                overflow: 'auto',
                              },
                            },
                          }}
                        >
                          {editorOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText primary={option} 
                                 primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }}/>
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
              {/* <Controller
                name="imprint"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      placeholder="Select Editor"
                      {...field}
                      //   options={ImprintOption}
                      //   isMulti
                      //   onChange={(e) => {
                      //     field.onChange(e)
                      //     handleTitleListRecordsFilterFetch()
                      //   }}
                      //   value={selectedImprintlist}
                      className="border border-solid border-neutral-300 font-poppins rounded-lg 
                              w-full lg:text-[14px] sm:text-[10px]"
                      components={{
                        MultiValueContainer: (props) => (
                          <components.MultiValueContainer {...props}>
                            <div className="flex">{props.children}</div>
                          </components.MultiValueContainer>
                        ),
                      }}
                      styles={{
                        input: (provided) => ({
                          ...provided,
                          position: `${
                            watch("imprint")?.length ? "relative" : "absolute"
                          }`,
                          left: 6,
                          marginRight: "60px",
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "6px",
                          minWidth: "none",
                        }),

                        valueContainer: (provided) => ({
                          position: "relative",
                          maxWidth: "28vw",
                          width: "100%",
                          paddingLeft: "8px",
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                          overflowX: "auto",
                          "@media (max-width:600px)": {
                            maxWidth: "55vw",
                          },
                        }),
                        control: (provided) => ({
                          display: "flex",
                          // maxWidth:"37vw",
                          // width:"510px",
                          height: "40px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }),
                        menuList: (provided) => ({
                          // ...provided,
                          maxHeight: "200px",
                          overflow: "hidden",
                          overflowY: "auto",
                        }),
                        clearIndicator: () => ({
                          marginLeft: "20px",
                          marginTop: "5px",
                          color: "gray",
                        }),
                      }}
                    />
                  );
                }}
              /> */}
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Bisac Status</p>
            <div className="w-full grid grid-cols-1">
            <Controller
                      name="bisac_status"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        onChange: (e) => handleTitleListRecordsFilterFetch(),
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="select-label"
                          multiple
                          className="border border-solid h-[45px] w-full border-neutral-300 font-poppins rounded-lg lg:text-[14px] sm:text-[9.9px]"
                          renderValue={(selected: string[]) => selected?.length > 1 ? "Multi Selected" :selected.join(", ")} // Ensure the selected value is correctly rendered
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                maxWidth:100,
                                overflow: 'auto',
                              },
                            },
                          }}
                        >
                          {bisacStatusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={field.value.indexOf(option) > -1} />
                              <ListItemText primary={option} 
                                 primaryTypographyProps={{
                                  style: {
                                fontSize:"14px",
                                  },
                                }}/>
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
              {/* <Controller
                name="imprint"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      placeholder="Select >Bisac Status"
                      {...field}
                      //   options={ImprintOption}
                      //   isMulti
                      //   onChange={(e) => {
                      //     field.onChange(e)
                      //     handleTitleListRecordsFilterFetch()
                      //   }}
                      //   value={selectedImprintlist}
                      className="border border-solid border-neutral-300 font-poppins rounded-lg 
                              w-full lg:text-[14px] sm:text-[10px]"
                      components={{
                        MultiValueContainer: (props) => (
                          <components.MultiValueContainer {...props}>
                            <div className="flex">{props.children}</div>
                          </components.MultiValueContainer>
                        ),
                      }}
                      styles={{
                        input: (provided) => ({
                          ...provided,
                          position: `${
                            watch("imprint")?.length ? "relative" : "absolute"
                          }`,
                          left: 6,
                          marginRight: "60px",
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "6px",
                          minWidth: "none",
                        }),

                        valueContainer: (provided) => ({
                          position: "relative",
                          maxWidth: "28vw",
                          width: "100%",
                          paddingLeft: "8px",
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                          overflowX: "auto",
                          "@media (max-width:600px)": {
                            maxWidth: "55vw",
                          },
                        }),
                        control: (provided) => ({
                          display: "flex",
                          // maxWidth:"37vw",
                          // width:"510px",
                          height: "40px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }),
                        menuList: (provided) => ({
                          // ...provided,
                          maxHeight: "200px",
                          overflow: "hidden",
                          overflowY: "auto",
                        }),
                        clearIndicator: () => ({
                          marginLeft: "20px",
                          marginTop: "5px",
                          color: "gray",
                        }),
                      }}
                    />
                  );
                }}
              /> */}
            </div>
          </div>
        </div>
        {/* <h2 className="text-[#e31c23]" >SEG</h2> */}
        {/* <Loading isLoading={isLoading}> */}
        <div className="font-poppins w-[80%] mx-4 ">
          <CommonDataTable
            muiTableProps={tableStyles}
            tableCursor="pointer"
            maxHeight="65vh"
            hasMore={hasMore}
            enableRowStyling={true}
            FetchCallbackFun={() => dispatch(UpdatePagination())}
            tableHeaders={TmmRecords}
            className={` h-screen `}
            data={TitleListdata}
            enableGlobalFilter={false}
            enableBottomToolbar={true}
            showRowNumbers
            scrollable
            pageSize={TitleListData?.length }
            // callback={handleRowClick}
            callback={(rowData, rowIndex) => handleRowClick(rowData, rowIndex)}
            selectedIndex={selectedRowIndex}
            colSizes={[100, 100, 100, 100, 100]}
            // nextCallback={()=>}
            actionButtons={true}
            customActionButton={(row: any) => (
              <div className="flex justify-center items-center ">
                <div className="flex justify-center items-center ">
                    <div className=" flex gap-2">
                      {/* <div>
                    <FaEye onClick={()=>handleRowClick} title="View"/>
                      </div> */}
                    <FaDownload title="Download"/>
                    </div>
                </div>
              </div>
            )}
            enableTopToolbar
            changeSelectedColumnDataDesign={[
              "PUB_DATE",
              "RELEASE_DATE",
              "FULL_TITLE",
              "totalPubGoal",
              "totalCurrentEst",
              "totalInitOrd",
              "US_PRICE",
              "estimatePubGoal",
              "TITLEPREFIXANDTITLE",
              "EBOOK_ISBN","EAN","BISAC1_DESC","BISAC_STATUS","CANADIAN_PRICE"
            ]}
            changedDataCellColumn={(header, accessor) => {
              if (accessor === "PUB_DATE" || accessor === "RELEASE_DATE") {
                return {
                  accessorKey: accessor,
                  header: header,
                  Cell: ({ row }: { row: any }) => (
                    <div>
                      {row.original[accessor]?.length > 2
                        ? moment(row.original[accessor]).format("MM/DD/YYYY")
                        : " - "}
                    </div>
                  ),
                };
              } else 
              if (accessor == "FULL_TITLE")
                return {
                  accessorKey: accessor,
                  header: header,
                  Cell: ({ row }: { row: any }) => (
                    <div className="overflow-auto">
                    <div className="whitespace-nowrap max-w-[400px] ">
                      {row.original[accessor]}
                    </div>
                    </div>
                  ),
                  size: 50,
                };
               else if (accessor == "TITLEPREFIXANDTITLE")
                  return {
                    accessorKey: accessor,
                    header: header,
                    Cell: ({ row }: { row: any }) => (
                      <div className="overflow-auto">
                      <div className="whitespace-nowrap max-w-[200px] w-[200px] ">
                        {row.original[accessor]}
                      </div>
                      </div>
                    ),
                    size: 50,
                  };
               else if (accessor == "EBOOK_ISBN")
                  return {
                    accessorKey: accessor,
                    header: header,
                    Cell: ({ row }: { row: any }) => (
                      <div className="overflow-auto">
                      <div className="whitespace-nowrap max-w-[110px] w-[110px] ">
                        {row.original[accessor]}
                      </div>
                      </div>
                    ),
                    size: 50,
                  };
               else if (accessor == "EAN")
                  return {
                    accessorKey: accessor,
                    header: header,
                    Cell: ({ row }: { row: any }) => (
                      <div className="overflow-auto">
                      <div className="whitespace-nowrap max-w-[110px] w-[110px] ">
                        {row.original[accessor]}
                      </div>
                      </div>
                    ),
                    size: 50,
                  };
              
                  else if (accessor == "BISAC1_DESC")
                    return {
                      accessorKey: accessor,
                      header: header,
                      Cell: ({ row }: { row: any }) => (
                        <div className="overflow-auto">
                        <div className="whitespace-nowrap max-w-[100px] w-[100px] ">
                          {row.original[accessor]}
                        </div>
                        </div>
                      ),
                      size: 50,
                    };
                  else if (accessor == "BISAC_STATUS")
                    return {
                      accessorKey: accessor,
                      header: header,
                      Cell: ({ row }: { row: any }) => (
                        <div className="overflow-auto">
                        <div className="whitespace-nowrap max-w-[100px] w-[100px] ">
                          {row.original[accessor]}
                        </div>
                        </div>
                      ),
                      size: 50,
                    };
              // else if (accessor == "totalInitOrd") {
              //   return {
              //     accessorKey: accessor,
              //     header: header,
              //     Cell: ({ row }: { row: any }) => {
              //       return (
              //         <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center">
              //           {row.original.totalInitOrd
              //             ? `${row.original.totalInitOrd["$numberDecimal"]}`
              //             : "-"}
              //         </div>
              //       );
              //     },
              //     size: 50,
              //   };
              // } else if (accessor == "estimatePubGoal") {
              //   return {
              //     accessorKey: accessor,
              //     header: header,
              //     Cell: ({ row }: { row: any }) => {
              //       const value = row?.original?.estimatePubGoal;
              //       const displayValue =
              //         value === null || value === undefined || value === " "
              //           ? "-"
              //           : value;
              //       return (
              //         <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center ">
              //           {/* {
              //         row.original.estimatePubGoal && row.original.estimatePubGoal["$numberDecimal"] != null && row.original.estimatePubGoal["$numberDecimal"] !== ""
              //           ? `${row.original.estimatePubGoal["$numberDecimal"]}`
              //           : "-"
              //       } */}
              //           {displayValue}
              //         </div>
              //       );
              //     },
              //     size: 50,
              //   };
              else if (accessor == "US_PRICE" || accessor=="CANADIAN_PRICE"|| accessor=="UK_PRICE" ) {
                return {
                  accessorKey: accessor,
                  header: header,
                  Cell: ({ row }: { row: any }) => {
                    // const price = parseFloat(row.original.US_PRICE).toFixed(2);
                    return (
                      <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center">
                        {" "}
                        {formatCurrency(row.original.US_PRICE)}{" "}
                      </div>
                    );
                  },
                  size: 50,
                };
              }
              return {
                accessorKey: accessor,
                header: header,
              };
            }}
            topToolbar={({ table }) => (
              <form
                // onSubmit={handleSubmit(handleSearch)}
                className="flex flex-col gap-4 p-2 "
              >
                 <div className={`md:flex sm:grid sm:grid-cols-2  gap-2  w-full ${!bgElement ? "z-10":""} `}>
                  <div className="w-full">
                    <p className="text-[#e31c23] font-bold "> ISBN</p> 
                    <div className="w-full grid grid-cols-1">
                          <Controller
                            control={control}
                            name="isbn"
                            rules={{
                              onChange: changeIsbnInfo,
                              required: "ISBN is required",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <div className="relative flex flex-col md: w-full">
                                <SelectList
                                  placeholder={"Select ISBN"}
                                  // onMenuScrollToBottom={() => {
                                  //   setIsbnSkip((old) => (old += 1));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: (isbnSkip + 1) * isbnLimit,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnString: isbnsString,
                                  //     })
                                  //   );
                                  // }}
                                  isMulti
                                  // onInputChange={(value) => {
                                  //   dispatch(setIsbnString(value));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: 0,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnString: value,
                                  //     })
                                  //   );
                                  // }}
                                  ref={ref}
                                  id="isbn-selector"
                                  name={name}
                                  onBlur={onBlur}
                                  value={selectedIsbnsList}
                                  noOptionsMessage={() => "ISBN not found"}
                                  components={{
                                    MultiValueContainer: (props) => (
                                      <components.MultiValueContainer {...props}>
                                        <div className="flex">
                                          {props.children}
                                        </div>
                                      </components.MultiValueContainer>
                                    ),
                                  }}
                            className="border border-solid border-neutral-300 font-poppins rounded-lg
                              w-full lg:text-[14px] sm:text-[10px]"

                            styles={{
                              input: (provided) => ({
                                ...provided,
                                position: `${
                                  watch("isbn")?.length
                                    ? "relative"
                                    : "absolute"
                                }`,
                                left: 6,
                                marginRight: "60px",
                              }),
                              multiValue: (provided) => ({
                                ...provided,
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "6px",
                                minWidth: "none",
                              }),

                              valueContainer: (provided) => ({
                                position: "relative",
                                maxWidth: "28vw",
                                width: "100%",
                                paddingLeft: "8px",
                                display: "flex",
                                alignItems: "center",
                                height: "40px",
                                overflowX: "auto",
                                "@media (max-width:600px)": {
                                  maxWidth: "55vw",
                                },
                              }),
                              control: (provided) => ({
                                display: "flex",
                                // maxWidth:"37vw",
                                // width:"510px",
                                height: "40px",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                              }),
                              menuList:(provided) => ({
                                // ...provided,
                                maxHeight:"200px",
                                overflow:'hidden',
                                overflowY:"auto",
                              }),
                              clearIndicator:()=>({
                                marginLeft: "20px",
                                marginTop:"5px",
                                color:"gray"
                              })
                            }}
                                  onChange={(selectedOptions) =>
                                    onChange(selectedOptions)
                                  }
                                  options={isbn_number_options}
                                />
                              </div>
                            )}
                          />
                    </div>
                      </div>
                        <div className="w-full">
                    <p className="text-[#e31c23] font-bold "> TITLE</p> 
                    <div className="w-full grid grid-cols-1">
                          <Controller
                            control={control}
                            name="title"
                            rules={{
                              onChange: changeIsbnInfo,
                              required: "Title is required",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                                <SelectList
                                  placeholder={"Select Title"}
                                  isMulti
                                  // onMenuScrollToBottom={() => {
                                  //   setIsbnSkip((old) => (old += 1));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: (isbnSkip + 1) * isbnLimit,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnTitle: isbnsString,
                                  //     })
                                  //   );
                                  // }}
                                  id="title-selector"
                                  ref={ref}
                                  // onInputChange={(value) => {
                                  //   dispatch(setIsbnString(value));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: 0,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnTitle: value,
                                  //     })
                                  //   );
                                  // }}
                                  name={name}
                                  onBlur={onBlur}
                                  value={selectedTitlesList}
                                  components={{
                                    MultiValueContainer: (props) => (
                                      <components.MultiValueContainer {...props}>
                                        <div className="flex w-full">
                                          {props.children}
                                        </div>
                                      </components.MultiValueContainer>
                                    ),
                                  }}
                                  styles={{
                                    input: (provided) => ({
                                      ...provided,
                                      position: `${
                                        watch("title")?.length
                                          ? "relative"
                                          : "absolute"
                                      }`,
                                      left: 6,
                                      marginRight: "60px",
                                    }),
                                    multiValue: (provided) => ({
                                      ...provided,
                                      height: "30px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "6px",
                                      minWidth: "none",
                                    }),
        
                                    valueContainer: (provided) => ({
                                      position: "relative",
                                      maxWidth: "28vw",
                                      width: "100%",
                                      paddingLeft: "8px",
                                      display: "flex",
                                      alignItems: "center",
                                      height: "40px",
                                      overflowX: "auto",
                                      "@media (max-width:600px)": {
                                        maxWidth: "55vw",
                                      },
                                    }),
                                    control: (provided) => ({
                                      display: "flex",
                                      // maxWidth:"37vw",
                                      // width:"510px",
                                      height: "40px",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }),
                                    menuList:(provided) => ({
                                      // ...provided,
                                      maxHeight:"200px",
                                      overflow:'hidden',
                                      overflowY:"auto",
                                    }),
                                    clearIndicator:()=>({
                                      marginLeft: "20px",
                                      marginTop:"5px",
                                      color:"gray"
                                    })
                                  }}
                                  noOptionsMessage={() => "Title not found"}
                                  className="border border-solid border-neutral-200 font-poppins rounded-lg  w-full lg:text-[14px] sm:text-[10px]"
                                  onChange={(selectedOptions) =>
                                    onChange(selectedOptions)
                                  }
                                  options={isbn_title_options}
                                />
                            )}
                          />
                    </div>
                       
                        </div  >
                        <div className="w-full">
                    <p className="text-[#e31c23] font-bold "> Author</p>
                    <div className="w-full grid grid-cols-1">
                    <Controller
                            control={control}
                            name="author"
                            rules={{
                              onChange: handleTitleListRecordsFilterFetch,
                              required: "Author is required",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                                <SelectList
                                  placeholder={"Select Author"}
                                  isMulti
                                  // onMenuScrollToBottom={() => {
                                  //   setIsbnSkip((old) => (old += 1));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: (isbnSkip + 1) * isbnLimit,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnTitle: isbnsString,
                                  //     })
                                  //   );
                                  // }}
                                  // id="title-selector"
                                  ref={ref}
                                  // onInputChange={(value) => {
                                  //   dispatch(setIsbnString(value));
                                  //   dispatch(
                                  //     fetchIsbnList({
                                  //       limit: isbnLimit,
                                  //       skip: 0,
                                  //       selectedData: watch("isbn")?.length
                                  //         ? watch("isbn").map(
                                  //             (isbn) => isbn.label
                                  //           )
                                  //         : [],
                                  //       isbnTitle: value,
                                  //     })
                                  //   );
                                  // }}
                                  name={name}
                                  onBlur={onBlur}
                                  value={selectedAuthorsList}
                                  components={{
                                    MultiValueContainer: (props) => (
                                      <components.MultiValueContainer {...props}>
                                        <div className="flex w-full">
                                          {props.children}
                                        </div>
                                      </components.MultiValueContainer>
                                    ),
                                  }}
                                  styles={{
                                    input: (provided) => ({
                                      ...provided,
                                      position: `${
                                        watch("title")?.length
                                          ? "relative"
                                          : "absolute"
                                      }`,
                                      left: 6,
                                      marginRight: "60px",
                                    }),
                                    multiValue: (provided) => ({
                                      ...provided,
                                      height: "30px",
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "6px",
                                      minWidth: "none",
                                    }),
        
                                    valueContainer: (provided) => ({
                                      position: "relative",
                                      maxWidth: "28vw",
                                      width: "100%",
                                      paddingLeft: "8px",
                                      display: "flex",
                                      alignItems: "center",
                                      height: "40px",
                                      overflowX: "auto",
                                      "@media (max-width:600px)": {
                                        maxWidth: "55vw",
                                      },
                                    }),
                                    control: (provided) => ({
                                      display: "flex",
                                      // maxWidth:"37vw",
                                      // width:"510px",
                                      height: "40px",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }),
                                    menuList:(provided) => ({
                                      // ...provided,
                                      maxHeight:"200px",
                                      overflow:'hidden',
                                      overflowY:"auto",
                                    }),
                                    clearIndicator:()=>({
                                      marginLeft: "20px",
                                      marginTop:"5px",
                                      color:"gray"
                                    })
                                  }}
                                  noOptionsMessage={() => "Author not found"}
                                  className="border border-solid border-neutral-200 font-poppins rounded-lg  w-full lg:text-[14px] sm:text-[10px]"
                                  onChange={(selectedOptions) =>
                                    onChange(selectedOptions)
                                  }
                                  options={authorOptions || []}
                                />
                            )}
                          />
                    </div>
                  </div>
                    
                </div>
              </form>
            )}
          />
        </div>
        {/* </Loading> */}
      </div>
    </div>
  );
};

export default TmmMain;
