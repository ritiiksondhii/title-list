import React, { useEffect } from "react";
import Alogo from "../../assets/images/Abrams.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  FetchDetailsRecord,
  PostpdfData,
  setDetails,
} from "../../redux/reducers/DetailPageReducer";
import { useParams } from "react-router-dom";
// import ResumePDFGenerator from "./generatePdf";
import moment from "moment";
import ResumePDFGenerator from "./genaeratPdf";

const DetailPagePdf: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const DetailData = useSelector(
    (state: RootState) => state.detailPageReducer.data
  );
  const setDetails = useSelector(
    (state: RootState) => state.detailPageReducer.selectedDetail
  );
   const selectedImprint = useSelector(
      (state: RootState) => state.ImprintReducer.selectedImprint
    );
  console.log(selectedImprint,'imprint');
  const params = useParams();
  useEffect(() => {
    dispatch(FetchDetailsRecord({ id: params.id ? params.id : setDetails ? setDetails : null }));
  }, [params.id]);

  const handleDownloadPdf = () => {
    // dispatch(PostpdfData({ id: params.id }));
    console.log(params.id, "params id");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" mx-20 overflow-y-auto h-[100vh] pb-4 mt-4">
        {/* <button className="bg-red-400 px-2 py-2" onClick={handleDownloadPdf}>
          Download
        </button> */}
        {/* <ResumePDFGenerator data={DetailData}/> */}
        <ResumePDFGenerator data={DetailData} />
        <div id="section1" style={{ height: "279mm" }} >
          <div className="bg-gradient-to-r from-red-500 text-white flex justify-between items-center px-6 py-4 mb-4 ">
            <h1 className="text-xl font-bold text-white">{DetailData.TESTIMPRINTFROMHNA} </h1>
            <span className="text-sm text-red-900">Fall 2025</span>
          </div>
          <div className="max-w-6xl mb-20 bg-white border border-black p-6 shadow-md ">
            {/* Title Section */}
            {/* <div className="mb-2">
            <h2 className="text-lg font-bold">
              Skyshade (The Lightlark Saga Book 3)
            </h2>
          </div>
          <div className="flex justify-between items-center  border-b border-black pb-4 mb-4"></div> */}

            <div className="flex justify-between  gap-6 mb-6">
              <div className="w-[70%] overflow-auto ">
                <p className=" text-[15px]">
                  <span className="font-semibold">ISBN:</span>{" "}
                  {DetailData.EAN ? DetailData.EAN : "-"}
                </p>
                <p className="text-[15px]">
                  <span className="font-semibold">TITLE:</span>{" "}
                  {DetailData.FULL_TITLE ? DetailData.FULL_TITLE : "-"}
                </p>
                {/* <p className="text-sm">
            <span className="font-semibold">Audio Rights:</span> Yes
          </p>
          <p className="text-sm">
            <span className="font-semibold">Pub Month:</span> September
          </p>
          <p className="text-sm">
            <span className="font-semibold">Rights Available:</span> World
            English
          </p>
          <p className="text-sm">
            <span className="font-semibold">Ames/Cart Qty:</span> 30/3000
          </p> */}
              </div>
              <div className="border-2 border-black ">
                <img
                  src={DetailData.IMAGE_URL ? DetailData.IMAGE_URL : "Image"}
                  className="object-fill w-[200px] h-[200px]  "
                  alt="Image"
                />
              </div>
            </div>
            <div className="flex justify-between items-center  border-b border-black mb-4"></div>
            <div className="flex justify-between  ">
              <div className="w-[500px] h-auto border-r border-black ">
                <p className="text-sm py-2 flex ">
                  <span className="font-semibold w-[150px]">AUTHOR :</span>
                  <p>{DetailData.AUTHOR_1 ? DetailData.AUTHOR_1 : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">RELEASE DATE</span>
                  <p>
                    {DetailData.RELEASE_DATE ? DetailData.RELEASE_DATE : "-"}{" "}
                  </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">PUB MONTH</span>{" "}
                  <p>{DetailData.PUBMONTH ? DetailData.PUBMONTH : "-"}</p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">ON SALE-DATE</span>{" "}
                  <p>{DetailData.PUB_DATE ? DetailData.PUB_DATE : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">AGE RANGE</span>{" "}
                  <p>{DetailData.AGE_RANGE ? DetailData.AGE_RANGE : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold flex gap-4  w-[150px]">
                    PRICE{" "}
                  </span>

                  <p className="font-normal px-2 ">
                    {DetailData.US_PRICE ? DetailData.US_PRICE : "-"}{" "}
                  </p>
                  <p className="font-normal px-2 ">
                    {DetailData.UK_PRICE ? DetailData.UK_PRICE : "-"}{" "}
                  </p>
                  <p className="font-normal px-2 ">
                    {DetailData.CANADIAN_PRICE
                      ? DetailData.CANADIAN_PRICE
                      : "-"}{" "}
                  </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">
                    ANNOUNCED 1ST PRINTING BEST
                  </span>
                  <p>
                    {DetailData.ANNOUNCED_1ST_PRINTING__BEST
                      ? DetailData.ANNOUNCED_1ST_PRINTING__BEST
                      : "-"}{" "}
                  </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">ORIGIN</span>{" "}
                  {/* <p>235678</p> */}
                
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold  w-[150px]">
                    AUTHOR BY LINE
                  </span>{" "}
                  <p>{DetailData.AUTHOR_1 ? DetailData.AUTHOR_1 : "-"} </p>
                </p>
              </div>
              <div className="w-[500px] h-auto pl-4">
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">EDITOR</span>{" "}
                  <p>{DetailData.EDITOR ? DetailData.EDITOR : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">SERIES</span>{" "}
                  <p>{DetailData.SERIES ? DetailData.SERIES : "-"} </p>{" "}
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">FORMAT</span>{" "}
                  <p>{DetailData.FORMAT ? DetailData.FORMAT : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">PAGE COUNT</span>{" "}
                  <p>{DetailData.PAGES ? DetailData.PAGES : "-"} </p>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">ILLUS /INSERT</span>{" "}
                  <p>
                    {DetailData.INSERTS_ILLUS ? DetailData.INSERTS_ILLUS : "-"}{" "}
                  </p>{" "}
                </p>
                <p className="text-sm py-2 flex">
                  <span className="font-semibold w-[150px]">
                    BISAC SUBJECT(S)
                  </span>{" "}
                </p>
                <p className="text-sm py-2 flex">
                  <span className="">
                    {DetailData.BISAC1_DESC ? DetailData.BISAC1_DESC : "-"}{" "}
                  </span>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="">
                    {DetailData.BISAC2_DESC ? DetailData.BISAC2_DESC : "-"}
                  </span>
                </p>
                <p className="text-sm py-2 flex">
                  <span className="">
                    {DetailData.BISAC3_DESC ? DetailData.BISAC3_DESC : "-"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center  border-b border-black pb-4 mb-4"></div>

            {/* Keywords Section */}
            {/* <div className="mb-6">
            <h3 className="text-[14px] font-semibold mb-2">KeyNote :</h3>
            <p className="text-sm text-gray-700"></p>
          </div> */}

            {/* <div className="mb-6">
            <h3 className="text-[14px] font-semibold mb-2">Selling Points:</h3> */}
            {/* <ul className=" pl-5 text-sm text-gray-700 list-none">
              <li className="py-4">
                <p className="font-semibold text-black ">
                  {" "}
                  FILM BUZZ :
                  <span className="font-normal">
                    Movie currently in production with Universal and Temple
                    Hill, the production studio behind the success of book
                    adaptations like Twilight, Maze Runner, and The Hate U Give.
                  </span>
                </p>
              </li>
              <li className="py-4">
                <p className="font-semibold text-black">
                  {" "}
                  BESTSELLING AUTHOR:
                  <span className="font-normal">
                    The Lightlark Saga (Book 2) was an instant #1 New York Times
                    bestseller, with tremendous anticipation for the series
                    finale. Book 1 was also featured as a Good Morning America
                    Book Club Pick and a Books-A-Million Club Pick.
                  </span>
                </p>
              </li>
              <li className="py-4">
                <p className="font-semibold text-black">
                  SOCIAL MEDIA REACH:
                  <span className="font-normal">
                    The Lightlark Saga (Book 2) was an instant #1 New York Times
                    bestseller, with tremendous anticipation for the series
                    finale. Book 1 was also featured as a Good Morning America
                    Book Club Pick and a Books-A-Million Club Pick.
                  </span>
                </p>
              </li>
              <li className="py-4">
                <p className="font-semibold text-black">
                  MEDIA DARLING:
                  <span className="font-normal">
                    The Lightlark Saga (Book 2) was an instant #1 New York Times
                    bestseller, with tremendous anticipation for the series
                    finale. Book 1 was also featured as a Good Morning America
                    Book Club Pick and a Books-A-Million Club Pick.
                  </span>
                </p>
              </li>
            </ul> */}
            {/* </div> */}

            {/* Description */}
            <div className="max-h-[100px] h-[100px] overflow-y-auto ">
              <h3 className="text-[14px] font-semibold mb-2">Description:</h3>
              <p className="text-sm text-gray-700  ">
                {DetailData.DESCRIPTION ? DetailData.DESCRIPTION : "-"}
              </p>
            </div>
            {/* Footer */}
            <div className="flex justify-between items-center mt-8  border-t border-gray-300 pt-4">
              <img
                src={Alogo}
                alt=""
                className="w-full max-w-36 h-18 object-cover "
              />
              <span className="text-sm text-gray-500"> {moment(DetailData.PUB_DATE).format("MM/DD/YYYY")} </span>
              <span className="text-sm text-gray-500">Page 1 of 2</span>
            </div>
          </div>
        </div>
       {
        DetailData.MARKETING_BULLETS__FACT_SHEET || DetailData.PUBLICITY || DetailData.CATEGORY1 || DetailData.CATEGORY2 || DetailData.CATEGORY3 || DetailData.AUTHOR_1 ?  <div id="section2" className=" overflow-y-auto  pb-4 relative">
        <div className="bg-gradient-to-r from-red-500 text-white flex justify-between items-center px-6 py-4 mb-4  ">
          <h1 className="text-xl font-bold text-white">{selectedImprint} </h1>
          <span className="text-sm text-red-900">Fall 2025</span>
        </div>
        <div
          style={{
            boxShadow: "5px 5px 5px 10px rgba(0, 0, 0, 0.3)",
            height: "279mm",
          }}
          className="max-w-6xl overflow-auto mb-20 bg-white border border-black p-6 shadow-md "
        >
          {/* Title Section */}

          {/* Keywords Section */}
          
            <div className={`mb-6 ${DetailData.AUTHOR_BIO.trim().length>=1? "max-h-[150px] h-[150px] overflow-y-auto ":""}`}>
            <h3 className={`text-[14px] font-semibold mb-2 `}>
              Contributor Bio :{" "}
            </h3>
            <p className="text-sm text-gray-700">
              {DetailData.AUTHOR_BIO ? DetailData.AUTHOR_BIO : "-"}
            </p>
          </div>
          
         <div className="mb-6">
          <h3 className="text-[14px] font-semibold mb-2">Marketing:</h3>
          <p className="text-[14px]">
            {DetailData.MARKETING_BULLETS__FACT_SHEET
              ? DetailData.MARKETING_BULLETS__FACT_SHEET
              : "-"}
          </p>
        </div>
         
         
          {/* Description */}
          {
            DetailData.PUBLICITY &&     <div>
            <h3 className="text-[14px]  font-semibold mb-2">Publicity:</h3>
            <p className="text-sm ">
              {DetailData.PUBLICITY ? DetailData.PUBLICITY : "-"}
            </p>
          </div>
          }
      {
        DetailData.CATEGORY1 || DetailData.CATEGORY2 || DetailData.CATEGORY3 ?
        <div>
            <h3 className="text-[14px] font-semibold mb-2">Category(s):</h3>
            <p className="text-sm text-gray-700">
              {DetailData.CATEGORY1 ? DetailData.CATEGORY1 : "-"}
              {DetailData.CATEGORY2 ? DetailData.CATEGORY2 : "-"}
              {DetailData.CATEGORY3 ? DetailData.CATEGORY3 : "-"}
            </p>
          </div> :""
      }
          
          <div className="absolute bottom-[120px] w-full">
            <div className="flex justify-between w-[95%] items-center border-t border-gray-300 pt-4">
              <img
                src={Alogo}
                alt=""
                className="w-full max-w-36 h-18 object-cover "
              />
              <span className="text-sm text-gray-500">{moment(DetailData.PUB_DATE).format("MM/DD/YYYY")} </span>
              <span className="text-sm text-gray-500">Page 2 of 3</span>
            </div>
          </div>
        </div>
      </div>:null
       }
      </div>
    </div>
  );
};

export default DetailPagePdf;
