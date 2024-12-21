import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import TmmMain from "../components/TMM/TmmMain";
import Loading from "../common-components/Loader";
import BookDetail from "../components/Detail page/BookDetail";

const Layout = React.lazy(() => import("./layout"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader:,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={
                  <Loading
                    isLoading={true}
                    height={80}
                    width={80}
                    color="#15223F"
                  ></Loading>
                }
              >
                <TmmMain />
              // </Suspense>
            }
          />
        ),
      },
      {
        path: "/details",
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={
                  <Loading
                    isLoading={true}
                    height={80}
                    width={80}
                    color="#15223F"
                  ></Loading>
                }
              >
              <BookDetail/>
               </Suspense>
            }
          />
        ),
      },
      // {
      //   path: "/login",
      //   element: (
      //     <Suspense
      //       fallback={
      //         <Loading
      //           isLoading={true}
      //           height={80}
      //           width={80}
      //           color="#15223F"
      //         ></Loading>
      //       }
      //     >
      //       <AdminLogin />
      //     </Suspense>
      //   ),
      // },
    ],
  },
 
]);