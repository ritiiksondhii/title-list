import { useLocation, useNavigate } from "react-router-dom";
// import Profile from "./Profile";
// import { navItems } from "../navbar/navbarConstants";
// import Notifications from "./notification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
// import { fetchAllUnreadNotifications } from "../../redux/reducers/nootificationReducer";
// import { user } from "../../redux/reducers/UserReducer";
// import { useMediaQuery } from "react-responsive";
import { changeBgElement } from "../../redux/reducers/dropdownReducer";
import Profile from "./Profile";
import { useMediaQuery } from "@mui/material";

interface TopBarProps {
  show?: boolean;
  // toggle?: () => void;
}
const TopBar: React.FC<TopBarProps> = ({ show }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bgElement = useSelector(
    (state: RootState) => state.dropdownReducer.bgElement
  );
  // const userData = useSelector(user);
  const isTabletOrMobile = useMediaQuery("max-width:320px");
  const sidebarElement = document.getElementById("sidebar-id");

  // useEffect(() => {
  //   if (userData?._id)
  //     dispatch(fetchAllUnreadNotifications(userData?._id || ""));
  // }, [userData]);

  useEffect(() => {
    if (isTabletOrMobile) {
      if (sidebarElement?.classList.contains("w-0")) {
        if (bgElement) dispatch(changeBgElement());
      }
      if (sidebarElement?.classList.contains("w-full")) {
        sidebarElement?.classList.add("w-0");
        sidebarElement?.classList.remove("w-full");
      }
    }
  }, [isTabletOrMobile, sidebarElement]);

  const toggle = () => {
    const sidebarElement = document.getElementById("sidebar-id");
    if (sidebarElement) {
      sidebarElement.classList.add(
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    }

    if (isTabletOrMobile) {
      if (sidebarElement?.classList.contains("w-0")) {
        sidebarElement?.classList.add("w-full");
        sidebarElement?.classList.remove("w-0");
        dispatch(changeBgElement());
      } else if (sidebarElement?.classList.contains("w-full")) {
        sidebarElement?.classList.add("w-0");
        sidebarElement?.classList.remove("w-full");
        dispatch(changeBgElement());
      }
    } else {
      if (sidebarElement?.classList.contains("lg:w-0")) {
        sidebarElement?.classList.add("lg:w-full");
        sidebarElement?.classList.remove("lg:w-0");
      } else if (sidebarElement?.classList.contains("lg:w-full")) {
        sidebarElement?.classList.add("lg:w-0");
        sidebarElement?.classList.remove("lg:w-full");
      }
    }
  };

  return (
    <div className="flex flex-col w-full  border-b-2 border-solid border-gray-200 ">
      <div className="flex flex-col justify-center px-4 py-4 md:px-8 md:py-6">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-5  w-full">
            {/* <div className="flex items-center text-sm md:text-sm cursor-pointer gap-2">
                <svg
                  onClick={toggle}
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-800 
                    "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h14"
                  />
                </svg>

                {/* <span className="  lg:w-40 md:w-24 ">
                  {navItems.filter(nav => nav.path === pathname)[0]?.label}
                </span> */}
              {/* </div> */}
            </div>
            <div className="flex  gap-2 md:gap-3">
              {/* <Notifications /> */}
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
