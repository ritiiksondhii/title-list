import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDropDown,
  changeDropdownStatus,
  closeDropdown,
  dropdownStatus,
  selectActiveDropdown,
  setActiveDropdown,
} from "../../redux/reducers/dropdownReducer";
import { AppDispatch } from "../../redux/store";

interface containerProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  bottomButtonChildren?: ReactNode;
  onMouseOver?: (data?: any, index?: number) => void;
  onMouseOut?: (data?: any, index?: number) => void;
  onChange?: (data?: any, index?: number) => void;
  onClick?: (data?: any, index?: number) => void;
  onMouseOutDependency?: () => void;
  id?: string;
  innerContainerClassName?: string;
}

interface itemProps {
  children?: ReactNode;
  className?: string;
  onClick?: (data: any) => void;
  onMouseOver?: (data?: any, index?: number) => void;
  onMouseOut?: (data?: any, index?: number) => void;
  onChange?: (data?: any, index?: number) => void;
}

const DropdownItem = ({ children, ...props }: itemProps) => {
  return (
    <div
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className={`py-2 px-4 ${props.className} cursor-pointer  flex items-center justify-start`}
    >
      {children}
    </div>
  );
};

const DropdownContainer = ({ children, ...props }: containerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDropdown = useSelector(selectActiveDropdown);
  const dropdownStatus = useSelector(changeDropDown);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      dropdownStatus
    ) {
      dispatch(closeDropdown());
      dispatch(setActiveDropdown(""));
      if (props.onMouseOutDependency) {
        props.onMouseOutDependency();
      }
    }
  };

  useEffect(() => {
    if (activeDropdown && activeDropdown === props.id) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleClick = () => {
    if (activeDropdown === props.id) {
      dispatch(closeDropdown());
      dispatch(setActiveDropdown(""));
    } else {
      dispatch(setActiveDropdown(props.id));
    }
  };

  return (
    <div ref={containerRef} className={`relative `}>
      <div className="cursor-pointer" onClick={handleClick}>
        {props.icon}
      </div>
      {activeDropdown === props.id && (
        <div
          className={`absolute bg-white border-2 border-gray-400 ${props.className}`}
          onClick={() => {
            if (dropdownStatus) {
              dispatch(closeDropdown());
            }
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Dropdown = {
  container: DropdownContainer,
  item: DropdownItem,
};
