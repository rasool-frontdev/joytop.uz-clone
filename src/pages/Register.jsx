import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../slice/auth.js";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [btnDisabled, setBtnDisabled] = useState(false);
  console.log(isLoading);

  const formRef = useRef();
  const otpRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const onChaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (res) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    const firstName = formRef?.current[0].value;
    const lastName = formRef?.current[1].value;
    const phone = formRef?.current[2].value;
    const password = formRef?.current[3].value;
    const confirmPassword = formRef?.current[4].value;

    if (firstName.length < 2 && lastName.length < 2) {
      toast.warning(t("Plese enter name or surname than 2 characters!"));
    } else if (phone.length !== 9) {
      toast.warning(
        t("Please enter the correct phone number! Should be 9 characters")
      );
    } else if (password.length < 5) {
      toast.warning(t("Please enter password more than 5 characters!"));
    } else if (password !== confirmPassword) {
      toast.warning(t("Password does not match. Please re-enter!"));
    } else {
      onChaptchVerify();
      setBtnDisabled(false);
      dispatch(registerUserStart());
      const user = {
        firstName,
        lastName,
        phone,
        dataCreated: getDate(),

        // password,
        // confirmPassword,
      };
      setUserData(user);

      const appVerifier = window.recaptchaVerifier;
      const formatPhone = "+998" + phone;

      signInWithPhoneNumber(auth, formatPhone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          dispatch(registerUserFailure());
          setToggle(true);
          toast.success(t("Success sended code!"));
          toast.warn(t("Please check your message!"));
        })
        .catch((error) => {
          dispatch(registerUserFailure());
          toast.error(error.message);
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
        const ref = doc(db, "usersData", result.user.uid);
        const docRef = await setDoc(ref, {
          userId: result.user?.uid,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          password: userData?.password,
          dataCreated: getDate(),
          phoneNumber: userData?.phone,
        })
          .then((res) => {
            dispatch(registerUserStart());
            localStorage.setItem(
              "userData",
              JSON.stringify({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                dataCreated: userData?.dataCreated,
              })
            );
            toast.success(t("Successfully registered user"));
          })
          .catch((error) => {
            dispatch(registerUserFailure());
            toast.error(error?.message);
            console.log(error?.message);
          });
        dispatch(registerUserStart());
        setUserData(result?.user);
        dispatch(registerUserSuccess(userData));
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  return (
    <>
      <div id="recaptcha-container" className="recaptcha-container"></div>
      <div className="mt-[-16px] mb-[100px] flex justify-center items-center register">
        <div>
          {toggle ? (
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
                <p className="text-center">+998 {userData.phone}</p>
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
          ) : (
            <>
              <form onSubmit={onSignup} ref={formRef}>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="name"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    {t("Name")}
                  </label>
                  <input
                    type="text"
                    className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder={t("Name")}
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="surname"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    {t("Surname")}
                  </label>
                  <input
                    type="text"
                    className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder={t("Surname")}
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="phone"
                    className="mb-[5px] text-[#575757] text-4 font-normal">
                    {t("Enter your phone number")}
                  </label>
                  <div className="text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea] flex items-center h-[50px]">
                    <span className="flex items-center px-3 h-full text-[14px] bg-[#e5e5ea50]">
                      +998
                    </span>
                    <input
                      id="phone"
                      type="phone"
                      className="w-[70%] font-normal px-[11px] py-[7px] text-[14px] outline-none"
                      placeholder={t("Enter your phone number")}
                    />
                  </div>
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="passwod"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    {t("Choose Password")}
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder={t("Choose Password")}
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="confirm"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    {t("Verify Password")}
                  </label>
                  <input
                    type="password"
                    className="input-active w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder={t("Verify Password")}
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
                    t("Sign up")
                  )}
                </button>
              </form>
            </>
          )}
        </div>
        <div className="recaptcha-container"></div>
      </div>
    </>
  );
};

export default Register;
