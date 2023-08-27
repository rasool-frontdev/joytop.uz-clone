import { useNavigate, useParams } from "react-router-dom";
import { homeCategories } from "../service/homeCategories";
import { useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import uploadImg from "../assets/uploadImg.png";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

// Initialization for ES Users

const AddApartments = () => {
  const { t, i18n } = useTranslation();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();

  function handleChangeImg(e) {
    console.log(e.target.files);
    setImg1(URL.createObjectURL(e.target.files[0]));
    setImg2(URL.createObjectURL(e.target.files[1]));
    setImg3(URL.createObjectURL(e.target.files[2]));
  }

  const handlerAddPoint = (e) => {
    e.preventDefault();
    // const image = formRef?.current[0]?.value;
    const image1 = formRef?.current[1]?.files[0];
    const image2 = formRef?.current[1]?.files[1];
    const image3 = formRef?.current[1]?.files[2];
    const startingPrice = formRef?.current[2].value;
    const salePrice = formRef?.current[3].value;
    const region = formRef?.current[4].value;
    const city = formRef?.current[5].value;
    const videoLink = formRef?.current[6].value;
    const name = formRef?.current[7].value;
    const convenienc = formRef?.current[8].value;
    const smokingY = formRef?.current[9].value;
    const smokingN = formRef?.current[10].value;
    const alcaholY = formRef?.current[11].value;
    const alcaholN = formRef?.current[12].value;
    const petY = formRef?.current[13].value;
    const petN = formRef?.current[14].value;
    const onlyFamilyY = formRef?.current[15].value;
    const onlyFamilyN = formRef?.current[16].value;
    const musicY = formRef?.current[17].value;
    const musicN = formRef?.current[18].value;
    const partyN = formRef?.current[20].value;
    const partyY = formRef?.current[19].value;
    const phone = formRef?.current[21].value;
    const message = formRef?.current[22].value;

    const addPointResorts = {
      image1,
      image2,
      image3,
      startingPrice,
      salePrice,
      region,
      city,
      videoLink,
      name,
      convenienc,
      smokingY,
      smokingN,
      alcaholY,
      alcaholN,
      petY,
      petN,
      onlyFamilyY,
      onlyFamilyN,
      musicY,
      musicN,
      partyN,
      partyY,
      phone,
      message,
      category: categoryId,
    };

    console.log(addPointResorts);
  };

  return (
    <div className="container">
      <div className="bg-[#F7F7FA] py-[2px] px-2 mb-4 w-10 h-10 flex items-center rounded-md">
        <BiArrowBack color="#575757" size={25} onClick={() => navigate(-1)} />
      </div>
      <h1 className="text-[#444] text-[32px] font-bold leading-[62px]">
        {t("Post an")} Apartment
      </h1>
      <form ref={formRef} onSubmit={handlerAddPoint}>
        <div className="pt-12 grid grid-cols-2 gap-x-8">
          {/* Uploade Img */}
          <div className="flex items-center justify-center h-[300px]">
            <label
              className="h-full px-3 py-2 w-full border border-dashed rounded-md hover:border-[#426BFF] hover:bg-[#e5e5e5] border-[#e5e5e5] cursor-pointer flex flex-wrap"
              htmlFor="upload-file">
              <div className="flex flex-col text-center justify-center items-center px-4">
                <img src={uploadImg} alt="upload image" />
                <button
                  type="button"
                  className="py-[5px] px-[10px] bg-[#ff7e47] text-[#ffeacb] text-[14px] rounded-md">
                  Upload photo
                </button>
              </div>
              <div className="flex-[66%] flex flex-col justify-center text-center px-4">
                <p className="text-[12px]">
                  {t("The number of photos should be more than 3")}
                </p>
                <p className="text-[12px]">
                  {t("Each photo should be less than 3Mb")}
                </p>
              </div>
              <input
                id="upload-file"
                type="file"
                multiple="multiple"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                onChange={handleChangeImg}
              />
            </label>
          </div>
          {/* Category */}
          <div>
            <div className="">
              <h1 className="text-2xl text-[#444]">{t("Category")}</h1>
              <div className="grid grid-cols-2 gap-x-8 pt-2">
                <div>
                  <p className="text-[#575757] text-4">Category</p>
                  <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                    <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] w-full flex items-center outline-none h-11">
                      <label htmlFor="region"></label>
                      <select
                        className="w-full border-none outline-none"
                        required>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Price */}
            <h1 className="text-2xl text-[#444] mt-6">{t("Price")}</h1>
            <div className="grid grid-cols-2 gap-x-4 pt-2 gap-4">
              <div>
                <p className="text-[#575757] text-4">Starting price</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                  <input
                    type="text"
                    className="h-11 pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                    placeholder="Price"
                    required
                  />
                  <span className="pr-2">UZS</span>
                </div>
              </div>
              <div>
                <p>Price on sale (optional)</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                  <input
                    type="text"
                    className="h-11 pl-2 outline-none text-[#575757]  px-[11px] py-[7px] rounded-md focus:border-[#ff7e47]"
                    placeholder="Price"
                    required
                  />
                  <span className="pr-2">UZS</span>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#575757] text-4">
                    Gage of deposite (optional)
                  </p>
                  <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                    <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] w-full flex items-center outline-none h-11">
                      <label htmlFor="region"></label>
                      <select
                        className="w-full border-none outline-none"
                        required>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {img1 && (
            <div className="flex items-center gap-4 max-h-[81px] mb-4">
              <div className={`relative ${img1 ? "inline" : "hidden"}`}>
                <img
                  src={img1}
                  alt="img"
                  id="upload-file"
                  className="w-[80px] h-[48px] object-cover"
                />
                <span
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setImg1()}>
                  <IoMdClose size={20} color="#575757" />
                </span>
              </div>
              <div className={`relative ${img2 ? "inline" : "hidden"}`}>
                <img
                  src={img2}
                  alt="img"
                  id="upload-file"
                  className="w-[80px] h-[48px] object-cover"
                />
                <span
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setImg2()}>
                  <IoMdClose size={20} color="#575757" />
                </span>
              </div>
              <div className={`relative ${img3 ? "inline" : "hidden"}`}>
                <img
                  src={img3}
                  alt="img"
                  id="upload-file"
                  className="w-[80px] h-[48px] object-cover"
                />
                <span
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setImg3()}>
                  <IoMdClose size={20} color="#575757" />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 mt-4 gap-x-8">
          <div>
            <div className="">
              <h1 className="mt-[10px] mb-1 text-[#575757]">Add video</h1>
              <div className="rounded-md border border-[#e5e5e5] text-[#444] flex hover:border-[#ff7e47]">
                <span className="bg-[#e5e5e5] rounded-l-md flex items-center text-[14px] px-[8px] py-[12px] w-[20%]">
                  Video link
                </span>
                <input
                  type="text"
                  placeholder="youtube.com"
                  className="pl-2 border-none w-full outline-none rounded-r-md "
                />
              </div>
            </div>
            {/* ADDRESS */}
            <h1 className="text-2xl text-[#444] mt-8">Address</h1>
            <div className="grid grid-cols-2 gap-x-8 pt-2">
              <div>
                <p className="text-[#575757] text-4">Region</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] w-full flex items-center outline-none h-11">
                    <label htmlFor="region"></label>
                    <select
                      className="w-full border-none outline-none"
                      required>
                      <option value="region">Region</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#575757] text-4">City / district</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] w-full  flex items-center h-11">
                    <label htmlFor="street"></label>
                    <select className="w-full border-none outline-none">
                      <option value="street">Street</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer flex items-center justify-center mt-4 px-[16px] py-[10px] rounded-md text-white bg-[#ff7e47]">
              <MdLocationPin size={20} />
              Choose geolocation
            </div>

            {/* MAIN INFORMATION */}
            <h1 className="text-2xl text-[#444] font-semibold mt-6">
              Main information
            </h1>
            <div className="grid grid-cols-2 gap-4 gap-x-8 pt-2">
              <div>
                <p className="text-[#575757] text-4">Count of rooms</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                    required
                  />
                </div>
              </div>
              <div>
                <p className="text-[#575757] text-4">
                  All area m<sup>2</sup>{" "}
                </p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#575757] text-4">Single bad count</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                    required
                  />
                </div>
              </div>
              <div>
                <p className="text-[#575757] text-4">Double bad count</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#575757] text-4 mt-4">
                Total area (optional)
              </p>
              <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                <input
                  type="text"
                  className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-[#444] font-semibold">Rules</h1>
            <div className="grid grid-cols-2 mt-2">
              <div>
                <h1 className="text-[#575757]">Smoking availible</h1>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  value="smokingY"
                  className="mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="smoking">
                  Yes
                </label>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  value="smokingN"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="smoking">
                  No
                </label>
              </div>
              <div>
                <h1 className="text-[#575757]">Alcohol availible</h1>
                <input
                  type="radio"
                  id="alcohol"
                  name="alcahol"
                  value="alcaholyes"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="alcohol">
                  Yes
                </label>
                <input
                  type="radio"
                  id="alcahol"
                  name="alcahol"
                  value="alcaholno"
                  className="ml-4 mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="alcahol">
                  No
                </label>
              </div>
              <div className="my-11">
                <h1 className="text-[#575757]">Pet availible</h1>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  value="petY"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="pet">
                  Yes
                </label>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  value="petN"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="pet">
                  No
                </label>
              </div>
              <div className="my-11">
                <h1 className="text-[#575757]">Availible only family</h1>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  value="familyY"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="family">
                  Yes
                </label>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  value="familyN"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="family">
                  No
                </label>
              </div>
              <div className="my-11">
                <h1 className="text-[#575757]">Loudy music availible</h1>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  value="musicY"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="music">
                  Yes
                </label>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  value="musicN"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="music">
                  No
                </label>
              </div>
              <div className="my-11">
                <h1 className="text-[#575757]">Party availible</h1>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  value="partyY"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="party">
                  Yes
                </label>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  value="partyN"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="part">
                  No
                </label>
              </div>
              <div>
                <h1 className="text-2xl text-[#444] mt-[-25px]">
                  Conveniences
                </h1>
                <div className="gap-x-8 pt-2">
                  <div>
                    <p className="text-[#575757] text-4">Select conveniences</p>
                    <div className="border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 h-[44px]">
                      <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] outline-none ">
                        <label htmlFor="convenienc"></label>
                        <select className="w-full border-none outline-none">
                          <option value="convenienc">convenienc </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/*CONTACT INFORMATION */}
          <h1 className="text-2xl text-[#444] font-semibold mt-6">
            Contact information
          </h1>
          <div className=" gap-x-8 pt-2">
            <div className="mb-8">
              <p className="text-[#575757] text-4 mb-1">
                Enter your phone number
              </p>
              <div className="rounded-md border border-[#e5e5e5] text-[#444] w-1/6 h-11 flex hover:border-[#ff7e47]">
                <span className="bg-[#F7F7FA] rounded-l-md flex items-center justify-center text-[14px] px-1 w-[32px]">
                  +
                </span>
                <input
                  type="text"
                  placeholder="998 123456789"
                  className="pl-2 border-none w-full outline-none rounded-r-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-[#444] font-semibold">
            Additional information
          </h1>
          <div className=" gap-x-8 pt-2">
            <div className="mb-8">
              <p className="text-[#575757] text-4 mb-1">
                Enter additional information (optional)
              </p>
              <div>
                <label htmlFor="message">
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-1/2 text-[#575757]  bg-gray-50 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#ff7e47] outline-none hover:border-[#ff7e47]"
                    placeholder="Write your thoughts here..."></textarea>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-[#ff7e47] text-white w-[360px] rounded-md">
            {t("Post an ad")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApartments;
