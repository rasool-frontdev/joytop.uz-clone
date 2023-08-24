import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { registerUserSuccess, userLoggedIn, userSignOut } from "../slice/auth";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserAuth = onAuthStateChanged(auth, (currentUser) => {
      dispatch(
        currentUser?.phoneNumber
          ? userLoggedIn(currentUser?.phoneNumber)
          : userSignOut({})
      );
    });

    const checkUserData = onAuthStateChanged(auth, (currentUser) => {
      dispatch(
        currentUser?.phoneNumber
          ? registerUserSuccess(JSON.parse(localStorage.getItem("user")))
          : userSignOut({})
      );
    });
    return () => {
      checkUserAuth();
      checkUserData();
    };
  }, [dispatch]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Navbar />
          <div className="container xss:max-w-[576px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1140px] pt-[146px]">
            <Outlet />
          </div>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
