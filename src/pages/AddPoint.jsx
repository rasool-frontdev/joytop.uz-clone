import { useParams } from "react-router-dom";
import { homeCategories } from "../service/homeCategories";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import uploadImg from "../assets/uploadImg.png";
import { useTranslation } from "react-i18next";

const AddPoint = () => {
  const { t, i18n } = useTranslation();
  const { categoryId } = useParams();
  const [region, setRegion] = useState("Tashkent");
  const [street, setStreet] = useState("Darkhan");

  let newObj = null;
  homeCategories.map((item) => {
    if (item.id === categoryId) {
      return (newObj = item);
    }
  });

  return (
    <div className="container">
      <div className="bg-[#F7F7FA] py-[2px] px-2 mb-4 w-10 h-10 flex items-center rounded-md">
        <BiArrowBack color="#575757" size={25} />
      </div>
      <h1 className="text-[#444] text-[32px] font-bold leading-[62px]">
        {t("Post an ad")}: {newObj.nameUz}
      </h1>
      <div>
        <div className="pt-12 grid grid-cols-2 gap-x-8">
          <div className="flex items-center justify-center">
            <label className="h-[300px] px-3 py-2 w-full border border-dashed rounded-md hover:border-[#426BFF] hover:bg-[#e5e5e5] border-[#e5e5e5] cursor-pointer flex flex-wrap ">
              <div className="flex flex-col text-center justify-center items-center px-4">
                <img src={uploadImg} alt="upload image" className="" />
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
              <input id="upload-file" type="file" className="hidden" />
            </label>
          </div>
          <div>
            <h1 className="text-2xl text-lightBlack">{t("Price")}</h1>
            <div className="grid grid-cols-2 gap-x-8 pt-2">
              <div>
                <p className="text-lightGrey text-4">Starting price</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1">
                  <input
                    type="text"
                    className="h-11 pl-2 rounded-md outline-none text-lightGrey text-[14px] focus:border-primary"
                    placeholder="Price"
                  />
                  <span className="pr-2">UZS</span>
                </div>
              </div>
              <div>
                <p>Starting on sale (optional)</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1">
                  <input
                    type="text"
                    className="h-11 pl-2 outline-none text-lightGrey  px-[11px] py-[7px] rounded-md focus:border-primary"
                    placeholder="Price"
                  />
                  <span className="pr-2">UZS</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl text-lightBlack mt-4">Address</h1>
            <div className="grid grid-cols-2 gap-x-8 pt-2">
              <div>
                <p className="text-lightGrey text-4">Region</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-lightGrey py-[7px] pl-[11px] w-full  flex items-center outline-none h-11">
                    <label htmlFor={region}></label>
                    <select
                      id={region}
                      name={region}
                      onChange={(e) => setRegion(e.target.value)}>
                      <option value={region}>{region}</option>
                      <option value={region}>{region}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lightGrey text-4">Region</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-lightGrey py-[7px] pl-[11px] w-full  flex items-center h-11">
                    <label htmlFor={region}></label>
                    <select
                      id={street}
                      name={street}
                      onChange={(e) => setRegion(e.target.value)}>
                      <option value={street}>{street}</option>
                      <option value={street}>{street}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center mt-4 px-[16px] py-[10px] rounded-md text-lightWhite bg-primary">
              <MdLocationPin size={20} />
              Choose geolocation
            </button>
          </div>
          <div>
            <h1 className="mt-4 mb-1 text-lightGrey">Add video</h1>
            <div className="rounded-md border border-secondGrey text-lightBlack  h-11 flex hover:border-primary">
              <span className="bg-secondGrey rounded-l-md flex items-center text-[14px] px-[8px] py-[12px] w-[20%]">
                Video link
              </span>
              <input
                type="text"
                placeholder="youtube.com"
                className="pl-2 border-none w-full outline-none rounded-r-md "
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-x-8">
          <div>
            <h1 className="text-2xl text-lightBlack font-semibold">
              Main information
            </h1>
            <div className=" gap-x-8 pt-2">
              <div>
                <p className="text-lightGrey text-4">Name</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-lightGrey text-[14px] focus:border-primary"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-2xl text-lightBlack mt-4">Conveniences</h1>
            <div className="gap-x-8 pt-2">
              <div>
                <p className="text-lightGrey text-4">Select conveniences</p>
                <div className="flex justify-between items-center border hover:border-primary rounded-md border-secondGrey text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-lightGrey py-[7px] pl-[11px] w-full  flex items-center outline-none h-11">
                    <label htmlFor={region}></label>
                    <select
                      id={region}
                      name={region}
                      onChange={(e) => setRegion(e.target.value)}>
                      <option value={region}>{region}</option>
                      <option value={region}>{region}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-lightBlack font-semibold">Rules</h1>
            <div className="grid grid-cols-2 mt-2">
              <div>
                <h1 className="text-lightGrey">Smoking availible</h1>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  value="true"
                  className="mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey ">Yes</label>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
              <div>
                <h1 className="text-lightGrey">Alcohol availible</h1>
                <input
                  type="radio"
                  id="alcohol"
                  name="alcahol"
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">Yes</label>
                <input
                  type="radio"
                  id="alcahol"
                  name="alcahol"
                  value="false"
                  className="ml-4 mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
              <div className="my-11">
                <h1 className="text-lightGrey">Pet availible</h1>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">Yes</label>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
              <div className="my-11">
                <h1 className="text-lightGrey">Availible only family</h1>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">Yes</label>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
              <div className="my-11">
                <h1 className="text-lightGrey">Loudy music availible</h1>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">Yes</label>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
              <div className="my-11">
                <h1 className="text-lightGrey">Party availible</h1>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-lightGrey">Yes</label>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-lightGrey">No</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-lightBlack font-semibold">
            Contact information
          </h1>
          <div className=" gap-x-8 pt-2">
            <div className="mb-8">
              <p className="text-lightGrey text-4 mb-1">
                Enter your phone number
              </p>
              <div className="rounded-md border border-secondGrey text-lightBlack w-1/6 h-11 flex hover:border-primary">
                <span className="bg-secondGrey rounded-l-md flex items-center text-[14px] px-1 w-[10%]">
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
          <h1 className="text-2xl text-lightBlack font-semibold">
            Additional information
          </h1>
          <div className=" gap-x-8 pt-2">
            <div className="mb-8">
              <p className="text-lightGrey text-4 mb-1">
                Enter additional information (optional)
              </p>
              <div>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-1/2 text-lightGrey  bg-gray-50 rounded-lg border border-secondGrey text-sm focus:border-primary outline-none hover:border-primary"
                  placeholder="Write your thoughts here..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPoint;
