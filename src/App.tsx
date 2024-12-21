import { RouterProvider } from "react-router-dom";
import { routes } from './router/route';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";


function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// const dispatch = useDispatch<AppDispatch>()
  // const token = localStorage.getItem("token");
  // const userData = useSelector(user);

  // const loginUserStatus = useSelector((state:RootState) => state.profileReducer.statusCode)

  // const loginUserData = useSelector((state:RootState) => state.profileReducer.userData)

  // const isAuthenticated = useIsAuthenticated()

  // const {instance} = useMsal()

  // const account = instance.getActiveAccount()
  

  


  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
