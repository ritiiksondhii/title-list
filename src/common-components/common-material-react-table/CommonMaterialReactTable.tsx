import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
} from "material-react-table";

import Pagination from "@mui/material/Pagination";

import Stack from "@mui/material/Stack";

import { PaginationItem, Tooltip, useMediaQuery } from "@mui/material";

interface RenderTopToolbarProps {
  table: MRT_TableInstance<any>; // Adjust the type according to your table's data type
}

type RenderTopToolbarFunction = (
  props: RenderTopToolbarProps
) => React.ReactNode;

// Define the interface for table headers

interface TableHeaders {
  [key: string]: string; // Maps column keys to header names
}

// Define the interface for additional columns

interface AddNewCellColumn {
  accessorKey: string;

  header: string;

  Cell?: (props: { row: any; index: number }) => JSX.Element;
}

interface changeColInterface<T> {
  accessorKey: string;

  header: string;

  Cell?: (props: { row: any }) => JSX.Element;

  // other properties
}

type ChangedDataCellColumnFunction = (
  header: string,

  accessor: string
) => changeColInterface<any>;

// Define the props interface with optional properties

interface CommonDataTableProps {
  data: any[]; // Replace `any` with a more specific type if known

  tableHeaders: TableHeaders;
  enableRowStyling?: boolean;

  element?: ReactNode;

  actionButtons?: boolean; // Optional

  editButton?: boolean; // Optional

  deleteButton?: boolean; // Optional

  callback: (data: any, index: number) => void;

  viewButton?: boolean; // Optional

  inputCells?: boolean; // Optional

  disableFields?: boolean; // Optional

  inputTypeColumnCallback?: (
    value: string,

    columnKey: string,

    index: number
  ) => void;

  addNewCellColumns?: AddNewCellColumn[]; // Optional

  changeSelectedColumnDataDesign?: string[]; // Optional

  changedDataCellColumn?: ChangedDataCellColumnFunction; // Optional

  customActionButton?: (row: any) => JSX.Element; // Optional

  topToolbar?: RenderTopToolbarFunction;

  muiTableRowProps?: string;

  colSizes?: any[];

  enableTopToolbar?: boolean;

  nextCallback?: (data?: any) => void;
  

  selectedIndex ?: number | null;

  tableCursor?: string;

  enableGlobalFilter?: boolean;

  pageSize?: number;

  totalPages?: number;

  totalDocuments?: number;

  showRowNumbers?: boolean;

  isLoading?: boolean;

  enableBottomToolbar?: boolean;

  NodataFound?: string;

  scrollable?: boolean;
  FetchCallbackFun?: any;
  enableRowEditing?:boolean;
  muiTableProps?:any;
  className?:string;
  hasMore?:boolean;
  maxHeight?:string;
}

interface MyData {
  id: number;

  name: string;
}

interface PaginationState {
  pageIndex: number;

  pageSize: number;
}

export const CommonDataTable: React.FC<CommonDataTableProps> = ({
  enableRowStyling=true,
  data,

  tableHeaders,

  element,

  actionButtons = false, // Default value

  editButton = false, // Default value

  deleteButton = false, // Default value

  callback,

  nextCallback,
  

  viewButton = false, // Default value

  inputCells = false, // Default value

  disableFields = false, // Default value

  inputTypeColumnCallback = () => {}, // Default empty function

  addNewCellColumns = [], // Default empty array

  changeSelectedColumnDataDesign = [], // Default empty array

  changedDataCellColumn,

  customActionButton,

  topToolbar,

  muiTableRowProps = "",

  colSizes = [],

  enableTopToolbar = false,

  enableGlobalFilter = false,

  selectedIndex ,

  tableCursor = "",

  pageSize = 15,

  totalPages,

  totalDocuments,

  showRowNumbers = true,

  enableBottomToolbar = false,

  isLoading = false,

  NodataFound = "No record found",

  scrollable = false,
  FetchCallbackFun,
  enableRowEditing=false,
  muiTableProps="",
  className="",
  hasMore=false,
  maxHeight="86vh"
}) => {
  const dataKeys = Object.keys(tableHeaders);
  // const[scrollToEnd,setScrollToEnd]=useState(null)
  // const scrollRef = useRef<HTMLDivElement | null>(null);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const isExtraSmallScreen = useMediaQuery("(max-width:530px)");

  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,

  //   pageSize: pageSize,
  // });

  const [page, setPage] = useState(1);

  // Define table columns based on headers and other props

  let tableColumns: MRT_ColumnDef<any>[] = [];

  if (showRowNumbers) {
    tableColumns.push({
      header: "S/No.", // Column header

      id: "rowNumber", // Unique column ID

      size: 50, // Column width

      Cell: ({ row }) =>
        totalPages
          ? row.index + 1 + (page > 1 ? pageSize * (page - 1) : 0)
          : row.index + 1, // Display row number
    });
  }

  tableColumns.push(
    ...dataKeys.map((e, index) => {
      if (changeSelectedColumnDataDesign.includes(e) && changedDataCellColumn) {
        return changedDataCellColumn(tableHeaders[e], e);
      }

      const columnDef: MRT_ColumnDef<any> = {
        accessorKey: e,

        header: tableHeaders[e],

        size: colSizes.length ? colSizes[index] : 50,

        Cell: ({ row }) => (row.original[e] ? row.original[e] : "-"),
      };

      if (inputCells) {
        columnDef.Cell = ({ row }) => (
          <input
            type={
              typeof row.original[e] === "string"
                ? "text"
                : typeof row.original[e] === "number"
                ? "number"
                : "text"
            }
            className="form-control"
            onChange={({ target }) =>
              inputTypeColumnCallback(target.value, e, row.index)
            }
            disabled={disableFields}
            value={row.original[e]}
            placeholder={tableHeaders[e]}
          />
        );
      }

      return columnDef;
    })
  );

  if (customActionButton && actionButtons) {
    tableColumns.push({
      id: "actions",

      header: "Action",

      Cell: ({ row }) => (
        <div className="hstack gap-2 fs-1">{customActionButton(row)}</div>
      ),
      enableEditing: false,
    });
  }
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const element = scrollRef.current;
  //     if (!element) return;

  //     // Safely access properties after null check
  //     const scrollHeight = element.scrollHeight;
  //     const scrollTop = element.scrollTop;
  //     const clientHeight = element.clientHeight;

  //     // Buffer of 50px before reaching bottom
  //     // const isNearBottom = scrollHeight - scrollTop - clientHeight < 5;
  //     const isAtBottom = scrollHeight - scrollTop === clientHeight;
  //     if (isAtBottom) {
  //       FetchCallbackFun()
  //     }
  //   };

  //   const element = scrollRef.current;
  //   if (element) {
  //     element.addEventListener('scroll', handleScroll);
      
  //     return () => {
  //       element.removeEventListener('scroll', handleScroll);
  //     };
  //   }
  // }, []);
  // const getTableBodyRowProps = (row: any) => {
  //   if (!enableRowStyling) {
  //     return {
  //       className:muiTableRowProps,
  //       sx:{
  //         backgroundColor: row.index === selectedIndex ? 'white' : 'white',
  //         '&:hover': {
  //           backgroundColor: row.index === selectedIndex ? 'white' : 'white',
  //         },
  //       }
  //     };  // Return empty object if styling is disabled
  //   }
    
  //   return {
  //     className: muiTableRowProps,
  //     sx: {
  //       height: "20px",
  //       backgroundColor: row.index === selectedIndex ? '#d9d9d9' : 'white',
  //       '&:hover': {
  //         backgroundColor: row.index === selectedIndex ? 'yellow' : 'yellow',
  //       },
  //       cursor: tableCursor,
  //       alignItems: "center",
  //       justifyContent: "center",
  //       textAlign: "center",
  //     },
  //     onClick: () => callback(row.original, row.index),
  //   };
  // };
  const scrollRef = useRef<HTMLDivElement | null>(null);
 
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const isAtBottom = (
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) <= 1;
 
      if (isAtBottom && hasMore) {
        if(FetchCallbackFun) FetchCallbackFun()
        // Add your logic here for when bottom is reached
      }
    }
  }, [hasMore]);
  return (
    <div className={`${className} w-full`}  >
      <MaterialReactTable
            muiTableContainerProps={{
              ref: scrollRef,  // Correct syntax: pass the ref directly, not as an object
              onScroll: handleScroll,
              sx: {
                maxHeight: maxHeight,
                overflow: 'auto'
              }
            }}
       
      // FetchCallbackFun={FetchCallbackFun}
      enablePagination={false}
        columns={tableColumns}
        data={data}
        enableEditing={enableRowEditing}
        editDisplayMode={"table"}
        enableRowNumbers={false}
        enableSorting={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        enableGlobalFilter={enableGlobalFilter}
        renderTopToolbar={topToolbar}
        enableTopToolbar={enableTopToolbar}
        enableStickyHeader={true}
        // muiTableBodyRowProps={({ row }) => getTableBodyRowProps(row)}

        muiTableProps={muiTableProps}
        // muiTableProps={{
        //   sx: {
        //     zIndex: 0,
        //   },
        // }}
        muiTableHeadProps={{
          sx: {
            '& .MuiTableRow-head': {
              '& .MuiTableCell-head': {
                padding: "8px",
                // border: ".5px solid #5C5C5C",
                textAlign: "center",
                alignItems:"center",
                backgroundColor: '#a6a6a6',
                outline: "none",
                verticalAlign: "middle",
               
              },
            },
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily:"poppins",
            '& .Mui-TableHeadCell-Content': {
              justifyContent: 'center',
              textAlign: 'center',
              // width: '100%',
            },
            '& .Mui-TableHeadCell-Content-Labels': {
              justifyContent: 'center',
              textAlign: 'center',
            },
            '& .Mui-TableHeadCell-Content-Wrapper': {
              justifyContent: 'center',
              textAlign: 'center',
            },
          },
        }}
        // muiTableHeadCellProps={{
        //   sx: {
        //     paddingLeft: "8px",

        //     border: ".5px solid #707070",

        //     fontSize: "13px",

        //     textAlign: "center",

        //     backgroundColor: "#A0A0A0"
        //   },
        // }}
        muiTableBodyCellProps={{
          sx: {
            padding: "8px",
            border: ".5px solid gray",

            alignItems: "center",

            justifyContent: "center",

            textAlign: "center",
          },
        }}
        muiTableBodyRowProps={({ row }) => {
          return {
            className: muiTableRowProps,

            sx: {
              height: "20px",
              
              backgroundColor: row.index === selectedIndex ? '#d9d9d9' : 'white',
              '&:hover': {
                backgroundColor: row.index === selectedIndex ? '#d9d9d9' : '#d9d9d9',
              },
            

              cursor: tableCursor,

              alignItems: "center",

              justifyContent: "center",

              textAlign: "center",
            },
            

            onClick: () => callback(row.original, row.index),
          };
        }}
        muiTopToolbarProps={{
          sx: {
            zIndex: 0,
          },
        }}
        // enableBottomToolbar={true}
        enableBottomToolbar={enableBottomToolbar}
        muiBottomToolbarProps={(data) => {
          return {
            sx: {
              zIndex: 0,

              fontSize: "5px",
            },
          };
        }}
        // state={{
        //   pagination: {
        //     pageIndex: pagination.pageIndex,

        //     pageSize: pagination.pageSize,
        //   },
        // }}
        // initialState={{
        //   pagination: {
        //     pageIndex: pagination.pageIndex,

        //     pageSize: pagination.pageSize,
        //   },
        // }}
        renderBottomToolbar={({ table }) => {
          return (
            <div
              className={` bg-white flex ${
                scrollable ? "justify-start ml-5" : "justify-end "
              } gap-4 items-center text-[14px]`}
            >
              {/* <p
                style={{
                  fontSize: isExtraSmallScreen ? "0.65rem" : "0.87rem",

                  margin: "0",
                }}
              >
                {`${
                totalDocuments
                  ? pageSize * page > totalDocuments
                    ? totalDocuments
                    : pageSize * page
                  : page * pageSize > data?.length
                  ? data?.length
                  : data?.length <= 0
                  ? 0
                  : page * pageSize
              } / ${totalDocuments ? totalDocuments : data?.length}`}</p> */}

              {!scrollable && (
                <Stack spacing={2} direction="row">
                  <Pagination
                    renderItem={(item) => {
                      let tooltipTitle = "";

                      switch (item.type) {
                        case "first":
                          tooltipTitle = "First Page";

                          break;

                        case "previous":
                          tooltipTitle = "Previous Page";

                          break;

                        case "next":
                          tooltipTitle = "Next Page";

                          break;

                        case "last":
                          tooltipTitle = "Last Page";

                          break;

                        default:
                          tooltipTitle = "";
                      }

                      return (
                        <Tooltip
                          title={tooltipTitle}
                          PopperProps={{
                            modifiers: [
                              {
                                name: "offset",

                                options: {
                                  offset: [0, -15],
                                },
                              },
                            ],
                          }}
                        >
                          <PaginationItem
                            {...item}
                            sx={{
                              minWidth: isExtraSmallScreen ? "18px" : "30px",

                              height: isExtraSmallScreen ? "28px" : "32px",

                              margin: isExtraSmallScreen ? "1px" : "0 4px",

                              padding: "0",

                              fontSize: isExtraSmallScreen
                                ? "11px"
                                : "0.875rem",
                            }}
                          />
                        </Tooltip>
                      );
                    }}
                    siblingCount={
                      isExtraSmallScreen ? 0 : isSmallScreen ? 1 : 1
                    }
                    boundaryCount={
                      isExtraSmallScreen ? 1 : isSmallScreen ? 1 : 1
                    }
                    size={isSmallScreen ? "small" : "medium"}
                    // onChange={(event, value) => {
                    //   setPage(value);

                    //   if (!totalPages)
                    //     setPagination((old) => ({
                    //       pageIndex: value - 1,

                    //       pageSize: old.pageSize,
                    //     }));

                    //   nextCallback && nextCallback(value);
                    // }}
                    count={totalPages ? totalPages : table.getPageCount()}
                    showFirstButton
                    showLastButton
                    page={page}
                    sx={{
                      display: "flex-row",

                      justifyContent: "center",

                      alignItems: "center",
                    }}
                  />
                </Stack>
              )}
            </div>
          );
        }}
        renderEmptyRowsFallback={({ table }) => (
          <div className=" text-gray-400 m-3 text-[14px] flex items-center justify-center">
            {NodataFound}{" "}
          </div>
        )}
      />
    </div>
  );
};
