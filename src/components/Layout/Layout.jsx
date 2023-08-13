import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
  return (
    <>
      <div className="">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Navbar />
          <div className="container pt-[146px]">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
