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
import { FetchSeason,UpdateSelectedSeason,UpdateSelectedSeasonList } from "../../redux/reducers/SeasonReducer";
import Select, { components } from "react-select";
import { fetchDivision, UpdateSelectedDivision, UpdateSelectedDivisionList } from "../../redux/reducers/DivisionReducer";
import { fetchImprint, UpdateSelectedImprint, UpdateSelectedImprintList } from "../../redux/reducers/ImprintReducer";
import { Controller, useForm } from "react-hook-form";
import { ScrollTableData } from "../../common-components/common-material-react-table/function";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import { fetchIsbnList, ISBNData, setIsbnString, UpdateSelectedISBNS, UpdateSelectedISBNSList, UpdateSelectedTitles, UpdateSelectedTitlesList } from "../../redux/reducers/ISBNSReducer";
import Loading from "../../common-components/Loader";
import { formatCurrency } from "../../common-components/commonFunctions";
import Alogo from '../../assets/images/logo.png'

interface OptionType {
  value: string;
  label: string;
}

interface FormValues {
  season: OptionType[];
  division: OptionType[];
  imprint: OptionType[];
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

  const selectedIsbns = useSelector((state:RootState) => state.isbnReducer.selectedISBNS)

  const navigate = useNavigate();
  const SeasonData = useSelector(
    (state: RootState) => state.SeasonReducer.data
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
    !(selectedTitlesList?.length ?? 0);
  setButtonDisabled(isAllFieldsEmpty);
}, [selectedSeasonlist, selectedDivisionlist, selectedImprintlist, selectedIsbnsList, selectedTitlesList]);


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
    return () => {
      dispatch(emptyTitleListPage())
    }
  }, []);

  const handleFilterClear=(e:any)=>{
    e.preventDefault()
    setValue("season",[])
    setValue("division",[])
    setValue("imprint",[])
    setValue("isbn",[])
    setValue("title",[])

    const seasonData = Array.isArray(watch("season"))
      ? watch("season").map((data) => data.value)
      : [];
    const division = Array.isArray(watch("division"))
      ? watch("division").map((data) => data.value)
      : [];

    const isbns = Array.isArray(watch("isbn"))
    ? watch("isbn").map((data) => data.value)
    : [];

    const imprint = Array.isArray(watch("imprint"))
      ? watch("imprint").map((data) => data.value)
      : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: [],
        Division: [],
        Imprint: [],
        TitleListIds:TitleListIds,
        isbns:[],
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns
      })
    );
    
    dispatch(UpdateSelectedISBNS([]))
    dispatch(UpdateSelectedTitles([]))
    dispatch(UpdateSelectedSeason([]))
    dispatch(UpdateSelectedDivision([]))
    dispatch(UpdateSelectedImprint([]))
    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    dispatch(UpdateSelectedImprintList(watch('imprint')))
  }


  useEffect(() => {
    const seasonData = Array.isArray(watch("season"))
      ? watch("season").map((data) => data.value)
      : [];

    const division = Array.isArray(watch("division"))
      ? watch("division").map((data) => data.value)
      : [];

    const isbns = Array.isArray(watch("isbn"))
    ? watch("isbn").map((data) => data.value)
    : [];

    const imprint = Array.isArray(watch("imprint"))
      ? watch("imprint").map((data) => data.value)
      : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: seasonData,
        Division: division,
        Imprint: imprint,
        TitleListIds:TitleListIds,
        isbns:isbns,
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns
      })
    );
    dispatch(UpdateSelectedISBNS(isbns))
    dispatch(UpdateSelectedTitles(isbns))
    dispatch(UpdateSelectedSeason(seasonData))
    dispatch(UpdateSelectedDivision(division))
    dispatch(UpdateSelectedImprint(imprint))
    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    dispatch(UpdateSelectedImprintList(watch('imprint')))

  }, [page]);

  useEffect(() => {

    const seasonData = Array.isArray(watch("season"))
      ? watch("season").map((data) => data.value)
      : [];

    const division = Array.isArray(watch("division"))
      ? watch("division").map((data) => data.value)
      : [];

    const isbns = Array.isArray(watch("isbn"))
    ? watch("isbn").map((data) => data.value)
    : [];

    const imprint = Array.isArray(watch("imprint"))
      ? watch("imprint").map((data) => data.value)
      : [];

    dispatch(fetchDivision({seasons:seasonData,divisions:division,isbns:isbns,imprint:imprint}));
    dispatch(FetchSeason({seasons:seasonData,divisions:division,isbns:isbns,imprint:imprint}));
    dispatch(fetchImprint({seasons:seasonData,divisions:division,isbns:isbns,imprint:imprint}));
    dispatch(
      fetchIsbnList({
        seasons:seasonData,divisions:division,isbns:isbns,imprint:imprint,
        limit: isbnLimit,
        skip: isbnLimit * isbnSkip,
        selectedData: watch("isbn")?.length
          ? watch("isbn").map((isbn) => isbn.label)
          : [],
      })
    );

  },[watch("season"),watch("division"),watch("imprint"),watch("isbn")])

  const options = SeasonData.map((SeasonData) => ({
    value: SeasonData.SEASON ?? "",
    label: SeasonData.SEASON ?? "",
  }));
  console.log(options,'optionss')
  const DivisionOption = divisionData.map((Division) => ({
    value: Division.division ?? "",
    label: Division.division ?? "",
  }));
  const ImprintOption = imprintData.map((imprint) => ({
    value: imprint.IMPRINT,
    label: imprint.IMPRINT,
  }));

  const handleRowClick = (row: any, index: number) => {
    dispatch(setSelectedRowIndex(index));
    // dispatch(setSelectedSeg(row._id));
    navigate(`/details/${row._id}`);
  };
  useEffect(() => {
    if (TitleListData && TitleListData.length > 0 && selectedRowIndex == 0) {
      dispatch(setSelectedRowIndex(0));
      // dispatch(setSelectedSeg(TitleListData[0]._id));
    }
  }, [TitleListData]);
  console.log(TitleListdata,'rec')

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
    const seasonData = Array.isArray(watch("season"))
      ? watch("season").map((data) => data.value)
      : [];

    const division = Array.isArray(watch("division"))
      ? watch("division").map((data) => data.value)
      : [];

    const isbns = Array.isArray(watch("isbn"))
    ? watch("isbn").map((data) => data.value)
    : [];

    const imprint = Array.isArray(watch("imprint"))
      ? watch("imprint").map((data) => data.value)
      : [];
      const TitleListIds=TitleListData.map((data)=>data._id)

    dispatch(
      FetchTitleListRecord({
        page: page,
        limit: limit,
        season: seasonData,
        Division: division,
        Imprint: imprint,
        TitleListIds:TitleListIds,
        isbns:isbns,
        prevSeason:selectedSeason,
        prevDivision:selectedDivision,
        prevImprint:selectedImprint,
        prevIsbns:selectedIsbns
      })
    );
    dispatch(UpdateSelectedISBNSList(watch('isbn')))
    dispatch(UpdateSelectedISBNS(isbns))
    dispatch(UpdateSelectedTitlesList(watch('title')))
    dispatch(UpdateSelectedTitles(isbns))
    dispatch(UpdateSelectedSeasonList(watch('season')))
    dispatch(UpdateSelectedSeason(seasonData))
    dispatch(UpdateSelectedDivisionList(watch('division')))
    dispatch(UpdateSelectedDivision(division))
    dispatch(UpdateSelectedImprintList(watch('imprint')))
    dispatch(UpdateSelectedImprint(imprint))
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
                        render={({ field }) => {
                          return (
                            <div className=" w-full">
                              <Select
                                {...field}
                                placeholder="Select Season"
                                options={options}
                                isMulti
                                onChange={(e) => {
                                  field.onChange(e)
                                  handleTitleListRecordsFilterFetch()
                                }}
                                value={selectedSeasonlist}
                                className="border border-solid border-neutral-300 font-poppins rounded-lg  w-full lg:text-[14px] sm:text-[10px] "
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
                                      watch("season")?.length
                                        ? "relative"
                                        : "absolute"
                                    }`,
                                    left: 6,
                                    marginRight: "80px",
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
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-[#e31c23] font-bold">DIVISION</p>
                    <div className="w-full grid grid-cols-1">
                      <Controller
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
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-[#e31c23] font-bold">IMPRINT</p>
                    <div className="w-full grid grid-cols-1">
                      <Controller
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
                      />
                    </div>
                  </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Managing Editor</p>
            <div className="w-full grid grid-cols-1">
              <Controller
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
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Editor</p>
            <div className="w-full grid grid-cols-1">
              <Controller
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
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#e31c23] font-bold ">Bisac Status</p>
            <div className="w-full grid grid-cols-1">
              <Controller
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
              />
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
            // customActionButton={()=>{}}
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
            ]}
            // changedDataCellColumn={(header, accessor) => {
            //   if (accessor === "PUB_DATE" || accessor === "RELEASE_DATE") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => (
            //         <div>
            //           {row.original[accessor]?.length > 2
            //             ? moment(row.original[accessor]).format("MM/DD/YYYY")
            //             : " - "}
            //         </div>
            //       ),
            //     };
            //   } else if (accessor == "FULL_TITLE")
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => (
            //         <div className="whitespace-nowrap max-w-[300px] overflow-y-auto">
            //           {row.original[accessor]}
            //         </div>
            //       ),
            //       size: 50,
            //     };
            //   else if (accessor == "totalPubGoal") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => {
            //         const value =
            //           typeof row?.original?.totalPubGoal === "number"
            //             ? row?.original?.totalPubGoal
            //             : row?.original?.totalPubGoal?.["$numberDecimal"];
            //         const displayValue =
            //           value || value === 0 ? `${value}` : "-";
            //         return (
            //           <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center">
            //             {/* {row.original.totalPubGoal ? `${row.original.totalPubGoal['$numberDecimal']}` : '-' } */}
            //             {displayValue}
            //           </div>
            //         );
            //       },
            //       size: 50,
            //     };
            //   } else if (accessor == "totalCurrentEst") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => {
            //         const value =
            //           typeof row?.original?.totalCurrentEst === "number"
            //             ? row?.original?.totalCurrentEst
            //             : row?.original?.totalCurrentEst?.["$numberDecimal"];
            //         const displayValue =
            //           value || value === 0 ? `${value}` : "-";
            //         return (
            //           <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center ">
            //             {/* {row.original.totalCurrentEst ? `${row.original.totalCurrentEst['$numberDecimal']}` : '-' } */}
            //             {displayValue}
            //           </div>
            //         );
            //       },
            //       size: 50,
            //     };
            //   } else if (accessor == "totalInitOrd") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => {
            //         return (
            //           <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center">
            //             {row.original.totalInitOrd
            //               ? `${row.original.totalInitOrd["$numberDecimal"]}`
            //               : "-"}
            //           </div>
            //         );
            //       },
            //       size: 50,
            //     };
            //   } else if (accessor == "estimatePubGoal") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => {
            //         const value = row?.original?.estimatePubGoal;
            //         const displayValue =
            //           value === null || value === undefined || value === " "
            //             ? "-"
            //             : value;
            //         return (
            //           <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center ">
            //             {/* {
            //           row.original.estimatePubGoal && row.original.estimatePubGoal["$numberDecimal"] != null && row.original.estimatePubGoal["$numberDecimal"] !== ""
            //             ? `${row.original.estimatePubGoal["$numberDecimal"]}`
            //             : "-"
            //         } */}
            //             {displayValue}
            //           </div>
            //         );
            //       },
            //       size: 50,
            //     };
            //   } else if (accessor == "US_PRICE") {
            //     return {
            //       accessorKey: accessor,
            //       header: header,
            //       Cell: ({ row }: { row: any }) => {
            //         // const price = parseFloat(row.original.US_PRICE).toFixed(2);
            //         return (
            //           <div className="whitespace-nowrap max-w-[300px] overflow-y-auto flex items-center justify-center">
            //             {" "}
            //             {formatCurrency(row.original.US_PRICE)}{" "}
            //           </div>
            //         );
            //       },
            //       size: 50,
            //     };
            //   }
            //   return {
            //     accessorKey: accessor,
            //     header: header,
            //   };
            // }}
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
                                <Select
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
                                <Select
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
                        name="imprint"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Select
                            placeholder="Select Author"
                              {...field}
                              // options={ImprintOption}
                              // isMulti
                              // onChange={(e) => {
                              //   field.onChange(e)
                              //   handleSegRecordsFilterFetch()
                              // }}
                              // value={selectedImprintlist}
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