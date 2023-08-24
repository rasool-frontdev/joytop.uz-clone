import { useRef, useState } from "react";
// import { signInWithGoogle } from "../firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";

const Login = () => {
  const { t, i18n } = useTranslation();
  const formRef = useRef();
  const { isLoading } = useSelector((state) => state.auth);
  const [btnDisabled, setBtnDisabled] = useState(false);

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

  const onSignIn = async (e) => {
    e.preventDefault();
    const phone = formRef?.current[0].value;
    const passwod = formRef?.current[1].value;
    console.log("Login");
  };
  return (
    <div className="">
      {/* <button onClick={signInWithGoogle}>Sing in with Google</button> */}
      <div className="mt-24 flex justify-center items-center">
        <div className="">
          <form onSubmit={onSignIn} ref={formRef}>
            <div className="mb-[8px] flex flex-col w-[300px]">
              <label
                htmlFor="phone"
                className="mb-[5px]  text-[#575757] text-4 font-normal">
                {t("Enter your phone number")}
              </label>
              <div className="phone-input text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea] flex items-center h-[50px]">
                <span className="flex items-center px-3 h-full text-[14px] bg-[#e5e5ea50]">
                  +998
                </span>
                <input
                  type="phone"
                  className="w-[70%] font-normal px-[11px] py-[7px] text-[14px] outline-none"
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
                className="w-full h-[50px] font-normal px-[11px] py-[7px] mb-4 text-[14px] text-[#575757] outline-[#575757] rounded-[6px] border-[1px] border-[#e5e5ea]"
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
            Forgot your password?
          </p>
          <div className="text-center">
            <Link to="/register" className="text-[#ff7e47]">
              Sign up
            </Link>{" "}
            if you do not have account yet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
