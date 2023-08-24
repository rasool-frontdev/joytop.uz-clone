import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Register = () => {
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
      toast.warning("Plese enter name or surname than 2 characters!");
    } else if (phone.length !== 9) {
      toast.warning(
        "Please enter the correct phone number! Should be 9 characters"
      );
    } else if (password.length < 5) {
      toast.warning("Please enter password more than 5 characters!");
    } else if (password !== confirmPassword) {
      toast.warning("Password does not match. Please re-enter!");
    } else {
      onChaptchVerify();
      setBtnDisabled(false);
      dispatch(registerUserStart());
      const user = {
        firstName,
        lastName,
        phone,
        password,
        confirmPassword,
      };
      setUserData(user);

      const appVerifier = window.recaptchaVerifier;
      const formatPhone = "+998" + phone;

      signInWithPhoneNumber(auth, formatPhone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          dispatch(registerUserFailure());
          setToggle(true);
          toast.success("Success sended otp code");
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
        const ref = doc(db, "usersData", result.user.uid);
        const docRef = await setDoc(ref, {
          userId: result.user?.uid,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          password: userData?.password,
          dataCreated: getDate(),
          phoneNumber: userData?.phone,
          verifyCode: code,
        })
          .then((res) => {
            localStorage.setItem("userData", {
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              dataCreated: userData?.dataCreated,
            });
            toast.success("Successfully registered user");
            console.log(res);
          })
          .catch((error) => {
            dispatch(registerUserFailure());
            toast.error(error?.message);
            console.log(error?.message);
          });
        dispatch(registerUserSuccess(userData));
        setUserData(result?.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.log(error);
      });
  };

  return (
    <>
      <div id="recaptcha-container" className="recaptcha-container"></div>
      <div className="mt-[-16px] mb-[100px] flex justify-center items-center">
        <div>
          {toggle ? (
            <>
              <form onSubmit={onOTPVerify} ref={otpRef}>
                <label
                  htmlFor="name"
                  className="mb-[5px]  text-[#575757] text-4 font-normal">
                  Введите код из SMS
                </label>
                <input
                  type="text"
                  className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                  placeholder="Введите код из SMS"
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
                    "Подвердить"
                  )}
                </button>
                <p className="text-center mt-4">Код отправлен на номер</p>

                <p className="text-center">+{userData.phone}</p>

                <p
                  // onClick={resendVerificationCode}
                  className="text-center mt-4 text-backBtn cursor-pointer">
                  Отправить занова
                </p>
                <p
                  onClick={() => navigate("/register")}
                  className="text-center mt-2 cursor-pointer text-backBtn">
                  Другой номер
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="surname"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder="Surname"
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="phone"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    Enter your phone number
                  </label>
                  <div className="phone-input text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea] flex items-center h-[50px]">
                    <span className="flex items-center px-3 h-full text-[14px] bg-[#e5e5ea50]">
                      +998
                    </span>
                    <input
                      type="phone"
                      className="w-[70%] font-normal px-[11px] py-[7px] text-[14px] outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="passwod"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    Choose Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder="Choose Password"
                  />
                </div>
                <div className="mb-[8px] flex flex-col w-[300px]">
                  <label
                    htmlFor="confirm"
                    className="mb-[5px]  text-[#575757] text-4 font-normal">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder="Confirm Password"
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
                    "Sign up"
                  )}
                </button>
              </form>
            </>
          )}
          <div className="recaptcha-container"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
