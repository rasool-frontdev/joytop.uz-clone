import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { auth } from "../firebase.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const [firstname, setFirtsname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    password: password,
  };

  const [userData, setUserData] = useState(null);

  // const phoneCode = {
  //   phone: phone,
  //   code: code,
  // };

  // const phoneNumber = {
  //   phone: phone,
  // };

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
    const appVerifier = window.recaptchaVerifier;
    const formatPhone = "+" + phone;
    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        // console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        setToggle(true);
        toast.success("Success sended otp code");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  const onOTPVerify = (e) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        toast.success("Successfully registered");
        setUserData(result.user);
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.log(error);
      });
  };

  // const registerHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("RegisterHandler");
  //   if (user.firstname.length < 3 || user.lastname.length < 3) {
  //     alert("Plese enter name or surname than 3 characters");
  //   } else if (user.phone.length !== 12) {
  //     alert("Plese enter 12 characters (998)-XXX-XX-XX");
  //   } else if (user.password.length < 6) {
  //     alert("Please enter password more than 6 characters");
  //   } else {
  //     setToggle((prev) => !prev);
  //     console.log("Success toggle paged");
  //     // generateRecaptcha();
  //     // let appVerifier = window.recaptchaVerifier;
  //     // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     //   .then((confirmationResult) => {
  //     //     window.confirmationResult = confirmationResult;
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log(error);
  //     //   });
  //     // const response = await AuthService.userRegister(user);
  //     // console.log(response.data);
  //     // if (response.data.message === "Phone unique") {
  //     //   alert("This number has already been registered");
  //     // } else {
  //     //   setToggle((prev) => !prev);
  //     //   console.log("Success toggle paged");
  //     // }
  //   }
  // };

  return (
    <>
      <div id="recaptcha-container" className="recaptcha-container"></div>
      <ToastContainer />
      <div className="mt-[-16px] flex justify-center items-center">
        <div>
          {toggle ? (
            <>
              <form onSubmit={onOTPVerify}>
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px]"
                  type="submit"
                  // disabled={isLoggedIn}
                >
                  {/* {isLoggedIn ? "Loading..." : "Подвердить"} */}
                </button>
                <p className="text-center mt-4">Код отправлен на номер</p>

                <p className="text-center">+{phone}</p>

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
              <form onSubmit={onSignup}>
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
                    value={firstname}
                    onChange={(e) => setFirtsname(e.target.value)}
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
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    placeholder=" Choose Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Name"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* <ValidationError /> */}
                {/* <Input
                  label={"Name"}
                  state={firstname}
                  setState={setFirtsname}
                  type={"text"}
                /> */}
                {/* <Input
                  label={"Surname"}
                  state={lastname}
                  setState={setLastname}
                  type={"text"}
                /> */}
                {/* <Input
                  label={"Enter your phone number"}
                  state={phone}
                  setState={setPhone}
                  type={"tel"}
                /> */}
                {/* <Input
                  label={"Choose Password"}
                  state={password}
                  setState={setPassword}
                  type={"password"}
                /> */}
                {/* <Input
                  label={"Verify Password"}
                  state={password}
                  setState={setPassword}
                  type={"password"}
                /> */}
                <button
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px] "
                  type="submit"
                  disabled={isLoggedIn}>
                  {isLoggedIn ? "Loading..." : "Sign up"}
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
