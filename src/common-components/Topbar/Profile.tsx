import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../common-components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  userProfile,
} from "../../redux/reducers/profileReducer";
import { AppDispatch } from "../../redux/store";
import { user } from "../../redux/reducers/UserReducer";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown, IoIosHelpCircle } from "react-icons/io";
import {
  onMouseOutChangeTrue,
  onMouseOverChangeFalse,
  role,
  showRole,
  dontShowRole,
} from "../../redux/reducers/dropdownReducer";
import { SiTicktick } from "react-icons/si";
import axios from "axios";
import { FaUser } from "react-icons/fa";
// import { handleLogout } from "../../msal/msal";

const Profile = () => {
  const navigate = useNavigate();

  const Role = useSelector(role);

  const profileUser = useSelector(userProfile);
  const userData = useSelector(user);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (Number(profileUser.statusCode) === 401) {
  //     {
  //       if (profileUser.status == "failed") {
  //         logout();
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("userroles")
  //         toast.dismiss();
  //         toast.error(profileUser.message);
  //       }
  //     }
  //   }
  //   if (profileUser.logout?.status === 200) {
  //     if (profileUser.logout.message?.length) {
  //       if (profileUser.logout) {
  //         toast.dismiss();
  //         axios.defaults.headers["authentication"] = "";
  //         toast.success(profileUser.logout.message);
  //         dispatch(emptyLogout());
  //       }
  //       navigate("/login");
  //     }
  //   }
  // }, [profileUser]);

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userroles");
  //   dispatch(logoutUser());
  //   handleLogout()
  // };

  return (
    <div className="flex items-center  max-md:w-full ">
      <Dropdown.container
        id="profile"
        icon={
          <div className="flex gap-2 items-center max-md:gap-1">
            {/* <FaUser/> */}
            <div className="flex flex-col md:w[">
              <div className="font-extrabold flex-col flex text-slate-700 md:text-sm capitalize">
                <div className="flex justify-center items-center gap-2">
                <p className="m-0 p-0">{userData?.first_name}</p>
                <IoIosArrowDown />
                </div>
                <p className="m-0 p-0  font-semibold" >{userData?.role?.length ?userData.role[0]:"" }</p>
              </div>
              {/* <div className="text-slate-400 md:text-sm">
                {userData?.role?.map(role => `${role} ${}`)}
              </div> */}
            </div>
            
          </div>
        }
        className="z-10 w-[130px] md:w-[180px] sm:right-[-26px] right-[2px] top-[50px] text-sm rounded-lg shadow-3xl "
        onMouseOutDependency={() => {
          dispatch(dontShowRole());
        }}
      >
        {/* <Dropdown.item className="hover:bg-gray-100" onClick={logout}>
          <div className="flex gap-3 items-center">
            <MdLogout className="md:w-6 h-6 w-5 text-black" />
            <div className=" text-slate-700 text-[12px] md:text-[14px]">Log Out</div>
          </div>
        </Dropdown.item> */}
        {/* <Dropdown.item className=" ">
          <div className="flex gap-3 items-center">
            <svg
              className="md:w-6 h-6 w-5 text-gray-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clip-rule="evenodd"
              />
            </svg>

            <div className=" flex text-slate-700 text-[12px] md:text-[14px]" >View Profile</div>
          </div>
        </Dropdown.item> */}
      </Dropdown.container>
    </div>
  );
};

export default Profile;
