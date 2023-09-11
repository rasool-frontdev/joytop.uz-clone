import { useRef, useState } from "react";
// import { signInWithGoogle } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../slice/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Login = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const formRef = useRef();
  const otpRef = useRef();
  const [toggle, setToggle] = useState(true);
  const { isLoading } = useSelector((state) => state.auth);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [userData, setUserData] = useState(null);

  const onChaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (res) => {
            onSignIn();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    const phone = formRef?.current[0].value;
    const password = formRef?.current[1].value;

    if (phone.length !== 9) {
      toast.warning(
        t("Please enter the correct phone number! Should be 9 characters")
      );
    } else if (password.length < 5) {
      toast.warning(t("Please enter password more than 5 characters!"));
    } else {
      const formatPhoneSearch = "998" + phone;
      onChaptchVerify();
      setBtnDisabled(false);
      dispatch(registerUserStart());
      const q = query(
        collection(db, "usersData"),
        where("phoneNumber", "==", formatPhoneSearch)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
        if (doc.data()) {
          if (userData.password !== password) {
            toast.error(t("Password is incorrect"));
          } else {
            dispatch(registerUserStart());
            const appVerifier = window.recaptchaVerifier;
            const formatPhone = "+998" + phone;

            signInWithPhoneNumber(auth, formatPhone, appVerifier)
              .then((confirmationResult) => {
                dispatch(registerUserStart());
                window.confirmationResult = confirmationResult;
                setToggle(false);
                dispatch(registerUserFailure());
                toast.success(t("Successfully sended code!"));
                toast.warn(t("Please check your message!"));
              })
              .catch((error) => {
                dispatch(registerUserFailure());
                toast.error(error.message);
              });
          }
        } else {
          toast.error(t("User not found!"));
        }
      });
    }
  };

  const onOTPVerify = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());
    const code = otpRef?.current[0].value;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        dispatch(registerUserStart());
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            dataCreated: userData?.dataCreated,
          })
        );
        dispatch(registerUserSuccess(userData));
        toast.success(t("Successfully logged in"));
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div id="recaptcha-container" className="recaptcha-container"></div>
      {/* <button onClick={signInWithGoogle}>Sing in with Google</button> */}
      <div className="mt-24 flex justify-center items-center">
        {toggle ? (
          <div className="">
            <form onSubmit={onSignIn} ref={formRef}>
              <div className="mb-[8px] flex flex-col w-[300px]">
                <label
                  htmlFor="phone"
                  className="mb-[5px]  text-[#575757] text-4 font-normal">
                  {t("Enter your phone number")}
                </label>
                <div className="input-active text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea] flex items-center h-[50px]">
                  <span className="flex items-center px-3 h-full text-[14px] bg-[#e5e5ea50]">
                    +998
                  </span>
                  <input
                    type="phone"
                    className="phone-input w-[70%] font-normal px-[11px] py-[7px] text-[14px] outline-none"
                    placeholder={t("Enter your phone number")}
                  />
                </div>
              </div>
              <div className="mb-[8px] flex flex-col w-[300px]">
                <label
                  htmlFor="password"
                  className="mb-[5px]  text-[#575757] text-4 font-normal">
                  {t("Password")}
                </label>
                <input
                  type="password"
                  className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                  placeholder={t("Password")}
                />
              </div>
              <button
                className={`w-full ${
                  btnDisabled ? "bg-[#ff7e4790]" : "bg-[#ff7e47]"
                } font-bold text-[#fff] text-4 h-[52px] rounded-[6px] flex justify-center items-center`}
                type="submit"
                disabled={btnDisabled}>
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin" size={25} />
                ) : (
                  t("Sign in")
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-[#ff7e47]">
              {t("Forgot your password?")}
            </p>
            <div className="text-center">
              <Link to="/register" className="text-[#ff7e47]">
                {t("Sign up")}
              </Link>{" "}
              {t("if you do not have account yet.")}
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={onOTPVerify} ref={otpRef}>
              <label
                htmlFor="name"
                className="mb-[5px]  text-[#575757] text-4 font-normal">
                {t("Enter code from SMS")}
              </label>
              <input
                type="text"
                className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                placeholder={t("Enter code from SMS")}
              />
              <button
                className={`w-full  ${
                  btnDisabled ? "bg-[#ff7e4790]" : "bg-[#ff7e47]"
                } font-bold text-[#fff] text-4 h-[52px] rounded-[6px] flex justify-center items-center`}
                type="submit"
                disabled={isLoading}>
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin" size={25} />
                ) : (
                  t("Confirm")
                )}
              </button>
              <p className="text-center mt-4">
                {t("Code sent to the number ")}
              </p>
              <p className="text-center">+998 {phone}</p>
              <p
                // onClick={resendVerificationCode}
                className="text-center mt-4 text-backBtn cursor-pointer">
                {t("Send again")}
              </p>
              <p
                onClick={() => navigate("/register")}
                className="text-center mt-2 cursor-pointer text-backBtn">
                {t("Another number")}
              </p>
            </form>
          </>
        )}
        <div className="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
