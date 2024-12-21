import React, { useEffect, useState } from "react";
import { navItems } from "./navConstants";
import NavigateItem from "./NavigateItem";
import Abrams from "../../assets/images/Abrams.png";


const Sidebar: React.FC = ({}) => {
  
  return (
    <aside
    className={`grid h-full  border-gray-300 
  border-solid border-r-[1px] lg:w-full w-0 overflow-hidden bg-white lg:bg-transparent  `}
    id={"sidebar-id"}
  >
      <div className="text-[14px]  border-r  border-gray-200 ">
        <div className="flex flex-col flex-1 w-full shrink basis-0 h-screen">
          <div className="flex flex-col px-3 pt-6 overflow-hidden items-start ">
          <div className="logo">
              <div className="">
                <img
                  loading="lazy"
                  src={Abrams}
                  alt="Abrams Logo"
                  className="object-contain w-[350px] h-[60px] max-w-full"
                />
              </div>
              {/* <div className="">
              <img
                loading="lazy"
                src={logo}
                alt="Logo"
                className="object-contain w-[70px] h-[40px] "
              />
              </div> */}
            </div>
            <nav className="flex flex-col mt-4 leading-loose  text-zinc-500 w-full ">
              {navItems.map((nav) => {
                return (
                  <div>
                    <NavigateItem
                      path={nav.path}
                      svg={nav.svg}
                      alt={nav.alt}
                      label={nav.label}
                    />
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
