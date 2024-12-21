import React, { ReactNode, useEffect } from "react";
import Loader, {
  Bars,
  Circles,
  Oval,
  RotatingLines,
  TailSpin,
  Vortex,
} from "react-loader-spinner";

interface loaderProps {
  children?: ReactNode;
  isLoading?: boolean;
  height?: number;
  width?: number;
  color?: string;
  stopAllEvents?: boolean;
}

const Loading: React.FC<loaderProps> = ({
  children,
  isLoading,
  height,
  width,
  color,
  stopAllEvents=false
}) => {

  // useEffect(() => {
  //   // Disable scroll when stopAllEvents is true and isLoading is true
  //   if (stopAllEvents && isLoading) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   // Cleanup to reset scroll behavior when component is unmounted or updated
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isLoading, stopAllEvents]);

  return (
    <div className="w-full">
      {/* {stopAllEvents && <div className={`${isLoading ? "absolute inset-0 bg-black opacity-50" : ""}`} style={{ pointerEvents: "all" }}></div>} */}
      {isLoading && (
        <div
          className={`${isLoading && "loading"}`}
          style={{ textAlign: "center" }}
        >
          {/* <Bars
            height={height || 80}
            width={width || 80}
            color={"#FF8A8A"}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
          {/* <RotatingLines
            visible={true}
            width={width || 80}
            strokeWidth="5"
            // color="blue"
            strokeColor="#FF8A8A"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            // wrapperStyle={{}}
            // wrapperClass="rotating-lines-wrapper"
          /> */}
          {/* <Oval
            visible={true}
            height={height || 80}
            width={width || 80}
            color={"#FF8A8A"}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          {/* <Circles
            height={height || 80}
            width={width || 80}
            color={"#FF8A8A"}
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
          {/* <Vortex
            visible={true}
            height={height || 80}
            width={width || 80}
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[
              "#C7253E",
              "#C7253E",
              "#C7253E",
              "#C7253E",
              "#C7253E",
              "#C7253E",
            ]}
          /> */}
          <TailSpin
            visible={true}
            height="60"
            width="80"
            color="red"
            ariaLabel="tail-spin-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Loading;
