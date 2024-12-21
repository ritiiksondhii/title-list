import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Userstate {
  dropdownStatus?: boolean;
  changeDropDown?: boolean;
  role?: boolean;
  activeDropdown?: string;
  bgElement?: boolean;
}

const initialState: Userstate = {
  dropdownStatus: false,
  changeDropDown: true,
  role: false,
  activeDropdown: "",
  bgElement: false,
};

const dropdownReducer = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    changeDropdownStatus(state) {
      if (state.changeDropDown) state.dropdownStatus = !state.dropdownStatus;
    },
    onMouseOverChangeFalse(state) {
      state.changeDropDown = false;
    },
    onMouseOutChangeTrue(state) {
      state.changeDropDown = true;
    },
    showRole(state) {
      state.role = !state.role;
    },
    dontShowRole(state) {
      state.role = false;
    },
    setActiveDropdown(state, action) {
      state.activeDropdown = action.payload;
    },
    closeDropdown(state) {
      state.activeDropdown = "";
    },
    changeBgElement: (state) => {
      state.bgElement = !state.bgElement;
    },
  },
});

export const {
  changeBgElement,
  closeDropdown,
  setActiveDropdown,
  changeDropdownStatus,
  onMouseOverChangeFalse,
  onMouseOutChangeTrue,
  showRole,
  dontShowRole,
} = dropdownReducer.actions;
export const dropdownStatus = (state: RootState) =>
  state.dropdownReducer.dropdownStatus;
export const changeDropDown = (state: RootState) =>
  state.dropdownReducer.changeDropDown;

export const selectActiveDropdown = (state: RootState) =>
  state.dropdownReducer.activeDropdown;

export const role = (state: RootState) => state.dropdownReducer.role;

export default dropdownReducer.reducer;
