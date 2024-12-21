import React from "react";
import BookDetailCard from "./BookDetailCard";
import Alogo from "../../assets/images/logo.png";

const BookDetail: React.FC = () => {
  return (
    <div className="overflow-auto h-[100vh] ">
      <div className="w-full flex justify-between h-[100px] ">
        <div className="flex justify-between  bg-red-400 w-[70%] px-2 py-2 text-[20px] font-bold text-white">
          <p className="flex justify-center items-center text-[30px]">
            {" "}
            Amulet Books
          </p>
          {/* <img src={Alogo} alt="" className="w-6 h-6" /> */}
          <p className="text-red-900 flex items-end ">Fall 2025</p>
        </div>

        <div className="w-[30%] bg-red-300 h-[250px] border-2 border-black ">
          box
        </div>
      </div>
      <div className="flex flex-col  border-2 border-black mt-6 bg-red-200 px-2 py-2 h-[126px] ">
        <div className="flex gap-5  py-2 ">
          <h1 className="text-[15px] font-bold ">ISBN</h1>
          <p>23456789 </p>
        </div>
        <div className="flex gap-5 py-2">
          <h1 className="text-[15px] font-bold ">TITLE</h1>
          <p>23456789 </p>
        </div>
      </div>
      {/* <BookDetailCard
        title="Skyshade (The Lightlark Saga Book 3)"
        author="Alex Aster"
        description="The pulse-pounding third novel in the #1 New York Times bestselling series..."
        releaseDate="2025-09-23"
        price={{ us: "$14.99", canada: "$18.99", uk: "£10.99" }}
        ageRange="Young Adult"
        categories={["Fantasy", "Dark Fantasy", "Romance"]}
        pageCount={400}
        imageUrl="https://example.com/image.jpg"
      /> */}

      <div className="flex  w-full border-2 border-black mt-2">
        <div className="w-[50%] border-r-2 border-black">
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px] w-[150px]  bg-red-300"> Author</p>
        <p className="text-red-400 text-[18px] "> Alexxxxx</p>
     </div>
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px]  w-[150px]"> RELEASE DATE</p>
        <p className="text-red-400 text-[18px]"> 23456</p>
     </div>
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px]  w-[150px]"> PUB DATE</p>
        <p className="text-red-400 text-[18px]"> january</p>
     </div>
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px]  w-[150px]">ON SALE-DATE</p>
        <p className="text-red-400 text-[18px]"> Alexxxxx</p>
     </div>
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px]  w-[150px]"> AGE RANGE</p>
        <p className="text-red-400 text-[18px]"> -</p>
     </div>
     <div className="flex gap-10 px-2">
        <p className="font-bold text-[18px]  w-[150px]"> PRICE</p>
        <div>
            
        </div>
     </div>



        </div>
        <div className="w-[50%]  ">2</div>
      </div>
    </div>
  );
};

export default BookDetail;
