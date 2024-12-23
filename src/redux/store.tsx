import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "../redux/reducers/dropdownReducer";
import profileReducer from "../redux/reducers/profileReducer";
import TitleListreducer from "../redux/reducers/TitleListreducer";
import SeasonReducer from "../redux/reducers/SeasonReducer";
import DivisionReducer from "./reducers/DivisionReducer";
import ImprintReducer from "../redux/reducers/ImprintReducer";
import managingEditorReducer from "../redux/reducers/managingEditorReducer";
import editorReducer from "../redux/reducers/editorReducer";
import BisanStatusReducer from "../redux/reducers/BisanStatusReducer";
import UserReducer from "../redux/reducers/UserReducer";
import isbnReducer from "./reducers/ISBNSReducer";
import AUTHOR1Reducer from "./reducers/AUTHOR1Reducer";
import eanReducer from "./reducers/EansReducer";
import detailPageReducer from './reducers/DetailPageReducer'

export const store = configureStore({
  reducer: {
    dropdownReducer,
    BisanStatusReducer,
    AUTHOR1Reducer,
    ImprintReducer,
    profileReducer,
    UserReducer,
    eanReducer,
    managingEditorReducer,
    editorReducer,
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
