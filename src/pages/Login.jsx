import { useState } from "react";
import Input from "../components/input";
import { signInWithGoogle } from "../firebase";
import { Link } from "react-router-dom";

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
    <div className="">
      {/* <button onClick={signInWithGoogle}>Sing in with Google</button> */}
      <div className="mt-24 flex justify-center items-center">
        <div className="">
          <form>
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
