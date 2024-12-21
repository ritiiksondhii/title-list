import React, { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { changeBgElement } from "../../redux/reducers/dropdownReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type DashboardItemProps = {
  svg: ReactNode;
  alt: string;
  label: string;
  path: string;
};

const NavigateItem: React.FC<DashboardItemProps> = ({ svg, label, path }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const sidebarElement = document.getElementById("sidebar-id");
  const { pathname } = useLocation();
  const handleNavigation = () => {
    navigate(path);
    if (isTabletOrMobile) {
      if (sidebarElement?.classList.contains("w-full")) {
        sidebarElement?.classList.add("w-0");
        sidebarElement?.classList.remove("w-full");
      }
      dispatch(changeBgElement());
    }
  };

  return (
    <div
      onClick={handleNavigation}
      className={`flex ${
        `/${pathname.split("/")[1]}` === path
          ? "bg-rose-100 text-[#e31c23] font-bold"
          : "bg-white text-gray-500"
      } hover:bg-rose-100 cursor-pointer overflow-hidden  text-sm gap-3 items-center p-2.5 mt-1 whitespace-nowrap rounded-lg min-h-[28px] `}
    >
      {svg}
      <div
        className={` ${
          `/${pathname.split("/")[1]}` === path
            ? "text-[#e31c23] font-bold text-[15px]"
            : " text-gray-400 text-[15px]"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default NavigateItem;
