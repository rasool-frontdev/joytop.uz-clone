import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Navbar />
          <div className="container xss:max-w-[576px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1140px] pt-[146px]">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
