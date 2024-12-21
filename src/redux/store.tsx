import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "../redux/reducers/dropdownReducer";
import profileReducer from "../redux/reducers/profileReducer";
import TitleListreducer from "../redux/reducers/TitleListreducer";
import SeasonReducer from "../redux/reducers/SeasonReducer";
import DivisionReducer from "./reducers/DivisionReducer";
import ImprintReducer from "../redux/reducers/ImprintReducer";
import UserReducer from "../redux/reducers/UserReducer";
import isbnReducer from "./reducers/ISBNSReducer";
import eanReducer from "./reducers/EansReducer";
import detailPageReducer from './reducers/DetailPageReducer'

export const store = configureStore({
  reducer: {
    dropdownReducer,
    profileReducer,
    UserReducer,
    eanReducer,
    ImprintReducer,
    DivisionReducer,
    TitleListreducer,
    SeasonReducer,
    isbnReducer,
    detailPageReducer
  },
});
export type AppStore = typeof store; // type of our store variable

// Infer the RootState and App type from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
