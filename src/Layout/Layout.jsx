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
import ModalPoint from "../components/ModalPoint";
import Loader from "../components/Loader";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.phoneNumber) {
        dispatch(userLoggedIn(currentUser?.phoneNumber));
        dispatch(
          registerUserSuccess(JSON.parse(localStorage.getItem("userData")))
        );
      } else {
        userSignOut({});
      }
    });

    return () => {
      checkUserAuth();
    };
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="">
        <Suspense fallback={<Loader />}>
          <Navbar />
          <div className="container pt-[146px] min-h-[96vh] pb-10">
            <Outlet />
          </div>
          <ModalPoint />
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
