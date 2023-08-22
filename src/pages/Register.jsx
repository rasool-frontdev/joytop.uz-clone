import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { auth } from "../firebase.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { addDoc } from "firebase/firestore";
const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const otpRef = useRef();
  // const [firstname, setFirtsname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [code, setCode] = useState("");
  // const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState(null);

  const onChaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (res) => {
            console.log(res);
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    onChaptchVerify();
    const firstName = formRef?.current[0].value;
    const lastName = formRef?.current[1].value;
    const phone = formRef?.current[2].value;
    const password = formRef?.current[3].value;
    const confirmPassword = formRef?.current[4].value;

    const user = {
      firstName,
      lastName,
      phone,
      password,
      confirmPassword,
    };
    setUserData(user);
    // console.log(user);
    setToggle(true);

    const appVerifier = window.recaptchaVerifier;
    const formatPhone = "+" + phone;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        setToggle(true);
        toast.success("Success sended otp code");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  const onOTPVerify = async (e) => {
    e.preventDefault();
    const code = otpRef?.current[0].value;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        await addDoc();
        toast.success("Successfully registered");
        await result.user.updateProfile({
          displayName: userData.firstName,
        });
        setUserData(result.user);
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.log(error);
      });
  };

  return (
    <>
      <div id="recaptcha-container" className="recaptcha-container"></div>
      <ToastContainer />
      <div className="mt-[-16px] flex justify-center items-center">
        <div>
          {toggle ? (
            <>
              <form onSubmit={onOTPVerify} ref={otpRef}>
                {/* <Input
                  label={"Введите код из SMS"}
                  state={code}
                  setState={setCode}
                  type={"text"}
                /> */}
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
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px]"
                  type="submit"
                  // disabled={isLoggedIn}
                >
                  {"Подвердить"}
                </button>
                <p className="text-center mt-4">Код отправлен на номер</p>

                <p className="text-center">+{userData.phone}</p>

                <p
                  // onClick={resendVerificationCode}
                  className="text-center mt-4 text-backBtn cursor-pointer">
                  Отправить занова
                </p>
                <p
                  onClick={() => setToggle(true)}
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
                    Phone
                  </label>
                  <input
                    type="phone"
                    className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
                    placeholder="998 XX XXX XXXX"
                  />
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
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px] "
                  type="submit">
                  Sign up
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
