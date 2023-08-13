import { useState } from "react";
import Input from "../components/input";
import { signInWithGoogle } from "../firebase";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = false;

  const loginHandler = async (e) => {
    e.preventDefault();
    // dispatch(signUserStart());
    // const user = { phone: phone, password: password };
    // const response = await AuthService.userLogin(user);
    console.log("Login");

    // if (response === undefined || response === null) {
    //   alert(response.data.message);
    // } else {
    //   if (response.data.isError === true) {
    //     alert(response.data.message);
    //   } else {
    //     dispatch(signUserSuccess(response.data.data));
    //     navigate("/");
    //   }
    // }
  };
  return (
    <div className="dashboard">
      {/* <button onClick={signInWithGoogle}>Sing in with Google</button> */}
      <div className="mt-24 flex justify-center items-center">
        <div className="">
          <form className="">
            {/* <ValidationError /> */}
            <Input
              label={"Enter your phone number"}
              state={phone}
              setState={setPhone}
              type={"tel"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              type={"password"}
            />
            <button
              className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px]"
              type="submit"
              disabled={isLoggedIn}
              onClick={loginHandler}>
              {isLoggedIn ? "Loading..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
