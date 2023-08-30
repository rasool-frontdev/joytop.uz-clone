import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { BiChevronDown, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { userSignOut } from "../slice/auth";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import languages from "../locales/languages";
import { setToggle } from "../slice/addPoint";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { toggle } = useSelector((state) => state.addPoint);

  const [toggleNav, setToggleNav] = useState(false);
  const [toggleLang, setToggleLang] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      dispatch(userSignOut({}));
      toast.success(t("Successfully sign out"));
      navigate("/login");
    } catch (error) {
      toast.error(t("Something went wrong!" + error.message));
    }
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("LANGUAGE");
    setSelectedLang(currentLanguage);
  }, []);

  const changeLanguageAction = (lang) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("LANGUAGE", lang);
    setSelectedLang(lang);
    setToggleLang(false);
  };
  return (
    <>
      <div className="fixed w-full top-0 z-[999] opacity-1 bg-[#fff]">
        <div className="shadow-[0_5px_50px_rgba(0,0,0,0.09)] w-full px-4">
          <div className="container">
            <div className="">
              <div className="mb-[0px] py-[25px] mx-auto sm:mx-none max-w-[510px] sm:max-w-full flex justify-between items-center">
                <NavLink to="/" className="flex items-center">
                  <img
                    src="http://joytop.mbs-edu.uz/static/media/logo.e6fa5e4a.svg"
                    alt="logo"
                    className="w-[125px] h-[35px]"
                  />
                </NavLink>
                <div className="flex items-center">
                  <NavLink to="login" className="mr-4">
                    <button className="px-4 h-[33px] text-[14px] border-[2px] border-[#ff7e47] rounded-[6px]  text-[#ff7e47]">
                      {t("About Us")}
                    </button>
                  </NavLink>
                  <div
                    className="md:hidden rounded-md bg-[#F7F7FA] hover:bg-[#E5E5EA] py-2 px-3"
                    onClick={() => setToggleNav((prev) => !prev)}>
                    <FiMenu size={25} />
                  </div>
                  <div className="hidden md:flex gap-4 items-center text-center">
                    <span className="relative tracking-[1px]">
                      {/* {response !== null && response.name} */}
                      <h6 className="after:content-[''] after:absolute hover:text-[#]  bg-[#ff7e47] h-[2px] w-full"></h6>
                    </span>
                    <NavLink
                      onClick={() => dispatch(setToggle())}
                      className="text-[14px] outline-none font-bold px-[15px] py-[5px] rounded-[6px] bg-[#ff7e47] hover:bg-[#ff9668] text-[#ffeacb] ">
                      {t("Add Point")}
                    </NavLink>

                    {isLoggedIn ? (
                      <>
                        <NavLink
                          className="text-[14px] border-[2px] border-[#ff7e47] rounded-[6px] px-[15px] py-[5px] text-[#ff7e47]"
                          onClick={handleLogout}>
                          {t("Sign out")}
                        </NavLink>
                        <NavLink
                          to="/profile"
                          className="text-[14px] border-[2px] border-[#ff7e47] rounded-[6px] px-[15px] py-[5px] text-[#ff7e47]">
                          {t("Profile")}
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to="login" className="">
                          <button className="px-4 h-[33px] text-[14px] border-[2px] border-[#ff7e47] rounded-[6px]  text-[#ff7e47]">
                            {t("Sign in")}
                          </button>
                        </NavLink>
                        <NavLink to="register" className="">
                          <button className="px-4 h-[33px] text-[14px] border-[2px] border-[#ff7e47] rounded-[6px]  text-[#ff7e47]">
                            {t("Sign up")}
                          </button>
                        </NavLink>
                      </>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setToggleLang((prev) => !prev)}
                        className="py-2 pl-[11px] pr-[8px] h-[33px] text-[14px] border-[1px] border-[#dadada] rounded-[6px]  text-[#8E8E93] flex items-center gap-[19px] focus:border-[#ff7e47]">
                        {selectedLang}
                        <BiChevronDown />
                      </button>
                      {toggleLang && (
                        <div className="absolute top-[33px] left-0 bg-white border w-[70px] rounded-md">
                          {Object.keys(languages).map((key) => (
                            <div
                              key={key}
                              onClick={() => changeLanguageAction(key)}
                              className={`${
                                selectedLang === key
                                  ? "active-language"
                                  : "none"
                              } px-2 py-3 text-left text-base font-normal hover:bg-[#f2faff] cursor-pointer rounded-md`}>
                              {key}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleNav && (
        <div className="w-full h-full bg-[#BEBFC2] fixed top-0 left-0 z-[100]">
          <div className="w-[90%] h-full mt-[86px] bg-[#fff] right-0 top-0 absolute">
            <div className="flex justify-between mt-5 mx-5 mb-6">
              <h1 className="text-base font-semibold ">{t("Menu")}</h1>
              <BiX
                size={20}
                color="#575757"
                onClick={() => setToggleNav((prev) => !prev)}
              />
            </div>
            <div className="text-[#565656] my-30 mx-4">
              <h1 className="mb-6 text-right text-base">{t("Add Point")}</h1>
              <h1 className="mb-6 text-right text-base">{t("Profile")}</h1>
              <h1 className="mb-6 text-right text-base">{t("Sign out")}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
