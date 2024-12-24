import React, { useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../common-components/sidebar/Sidebar";
import TopBar from "../common-components/Topbar/Topbar";
// import { useMediaQuery } from "react-responsive";
// import { changeBgElement } from "../redux/reducers/dropdownReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useMediaQuery } from "@mui/material";
import { changeBgElement } from "../redux/reducers/dropdownReducer";

const Layout = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>();
   const bgElement = useSelector(
    (state: RootState) => state.dropdownReducer.bgElement
  );
  const hideNavbar =
    ["/login", "/forgot-password"].includes(location.pathname) ||
    location.pathname.split("/").includes("onBoarding") ||
    location.pathname.split("/").includes("onboarding") ||
    location.pathname.split("/").includes("reset-password") ||
    location.pathname.split("/").includes("landing") ||
    location.pathname.split("/").includes("notAuthorized");

    const isTabletOrMobile = useMediaQuery("max-width: 1023px");
    const sidebarElement = document.getElementById("sidebar-id");
    const handleClickOutside = (event: any) => {
      if (
        isTabletOrMobile &&
        sidebarElement &&
        !sidebarElement.contains(event.target)
      ) {
        if (sidebarElement?.classList.contains("w-full")) {
          sidebarElement?.classList.add("w-0");
          // sidebarElement?.classList.add("overflow-hidden")
          sidebarElement?.classList.remove("w-full");
        }
      }
    };

    useEffect(() => {
      if (sidebarElement) {
        if (!isTabletOrMobile) if (bgElement) dispatch(changeBgElement());
        if (isTabletOrMobile)
          document.addEventListener("mousedown", handleClickOutside);
        else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isTabletOrMobile, sidebarElement]);

  return (
    <div className="w-full overflow-hidden font-poppins h-screen">
      <div className="overflow-hidden w-full bg-slate-50 ">
        <main className="flex relative w-full overflow-hidden  transition-all duration-50 ease-in-out transform">
        {!hideNavbar && (
            <div className="flex max-md:flex-col z-10 w-[15%] ">
              <Sidebar />
            </div>
          )}
          <div
            className={`flex flex-col overflow-hidden w-full ${
              !hideNavbar && "fixed inset-0"
            }  lg:static  `}
            id="overlay-id "
          >
               {!hideNavbar && (
              <div className="w-full">
                <TopBar />
              </div>
            )}
            <div className="overflow-y-auto
             w-full  ">
              <Outlet />
            </div>
            {isTabletOrMobile && bgElement && (
              <div
                onClick={() => dispatch(changeBgElement())}
                className="absolute bg-black bg-opacity-50 h-screen w-full"
              ></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
