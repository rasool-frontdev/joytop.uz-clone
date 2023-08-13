import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";

const Register = () => {
  const [firstname, setFirtsname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    password: password,
  };

  const phoneCode = {
    phone: phone,
    code: code,
  };

  const phoneNumber = {
    phone: phone,
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (user.firstname.length < 3 || user.lastname.length < 3) {
      alert("Plese enter name or surname than 3 characters");
    } else if (user.phone.length !== 12) {
      alert("Plese enter 12 characters (998)-XXX-XX-XX");
    } else if (user.password.length < 6) {
      alert("Please enter password more than 6 characters");
    } else {
      // const response = await AuthService.userRegister(user);
      // console.log(response.data);
      // if (response.data.message === "Phone unique") {
      //   alert("This number has already been registered");
      // } else {
      //   setToggle((prev) => !prev);
      //   console.log("Success toggle paged");
      // }
    }
  };

  return (
    <>
      <div className="mt-[-16px] flex justify-center items-center">
        <div>
          {!toggle ? (
            <>
              <form>
                <Input
                  label={"Введите код из SMS"}
                  state={code}
                  setState={setCode}
                  type={"text"}
                />
                <button
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px]"
                  type="button"
                  // disabled={isLoggedIn}
                  // onClick={confirmCode}
                >
                  {/* {isLoggedIn ? "Loading..." : "Подвердить"} */}
                </button>
                <p className="text-center mt-4">Код отправлен на номер</p>

                <p className="text-center">+{phoneCode.phone}</p>

                <p
                  // onClick={resendVerificationCode}
                  className="text-center mt-4 text-backBtn cursor-pointer">
                  Отправить занова
                </p>
                <p
                  onClick={() => setToggle((prev) => !prev)}
                  className="text-center mt-2 cursor-pointer text-backBtn">
                  Другой номер
                </p>
              </form>
            </>
          ) : (
            <>
              <form>
                {/* <ValidationError /> */}
                <Input
                  label={"Name"}
                  state={firstname}
                  setState={setFirtsname}
                  type={"text"}
                />
                <Input
                  label={"Surname"}
                  state={lastname}
                  setState={setLastname}
                  type={"text"}
                />
                <Input
                  label={"Enter your phone number"}
                  state={phone}
                  setState={setPhone}
                  type={"tel"}
                />
                <Input
                  label={"Choose Password"}
                  state={password}
                  setState={setPassword}
                  type={"password"}
                />
                <Input
                  label={"Verify Password"}
                  state={password}
                  setState={setPassword}
                  type={"password"}
                />
                <button
                  className="w-full bg-[#ff7e47] font-bold text-[#fff] text-4 h-[52px] rounded-[6px] "
                  type="submit"
                  disabled={isLoggedIn}
                  onClick={registerHandler}>
                  {isLoggedIn ? "Loading..." : "Sign up"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
