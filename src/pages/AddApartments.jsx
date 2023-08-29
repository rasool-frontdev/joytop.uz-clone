import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import uploadImg from "../assets/uploadImg.png";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

// Initialization for ES Users

const AddApartments = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const formRef = useRef();
  const uuid = crypto.randomUUID();

  const [img1, setImg1] = useState();
  const [smoking, setSmoking] = useState(false);
  const [alcahol, setAlcahol] = useState(false);
  const [pet, setPet] = useState(false);
  const [family, setFamily] = useState(false);
  const [music, setMusic] = useState(false);
  const [party, setParty] = useState(false);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  }

  function handleChangeImg(e) {
    setImg1(URL.createObjectURL(e.target.files[0]));
  }

  const handlerAddPoint = (e) => {
    e.preventDefault();
    const image1 = formRef?.current[1]?.files[0];
    const type = formRef?.current[2].value;
    const startingPrice = formRef?.current[3].value;
    const salePrice = formRef?.current[4].value;
    const deposite = formRef?.current[5].value;
    const videoLink = formRef?.current[6].value;
    const region = formRef?.current[7].value;
    const city = formRef?.current[8].value;
    const countRoom = formRef?.current[9].value;
    const allArea = formRef?.current[10].value;
    const singleBed = formRef?.current[11].value;
    const doubleBed = formRef?.current[12].value;
    const totalArea = formRef?.current[13].value;
    // const onlyFamilyY = formRef?.current[15].value;
    // const onlyFamilyN = formRef?.current[16].value;
    // const musicY = formRef?.current[24].value;
    // const musicN = formRef?.current[25].value;
    // const partyY = formRef?.current[23].value;
    const convenienc = formRef?.current[26].value;
    const phone = formRef?.current[27].value;
    const name = formRef?.current[15].value;
    const message = formRef?.current[28].value;

    let data = {
      type,
      id: uuid,
      // image: downloadURL,
      image1,
      // onlyFamilyY,
      // onlyFamilyN,
      // musicY,
      // musicN,
      // partyN,
      // partyY,
      startingPrice,
      salePrice,
      region,
      totalArea,
      deposite,
      city,
      videoLink,
      countRoom,
      name,
      convenienc,
      smoking,
      allArea,
      alcahol,
      pet,
      family,
      music,
      party,
      phone,
      singleBed,
      doubleBed,
      message,
      category: "apartments",
      userId: auth?.currentUser?.uid,
      createdData: getDate(),
    };
    if (image1 == null) return;

    try {
      const docRef = collection(db, "apartments");
      const storageRef = ref(storage, `apartmentsImages/${uuid}`);
      const uploadTask = uploadBytesResumable(storageRef, image1);
      uploadTask.on(
        () => {
          toast.error("Image not uploaded");
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await addDoc(docRef, {
                type,
                id: uuid,
                image: downloadURL,
                startingPrice,
                salePrice,
                region,
                totalArea,
                deposite,
                city,
                videoLink,
                countRoom,
                name,
                convenienc,
                smoking,
                allArea,
                alcahol,
                pet,
                family,
                music,
                party,
                phone,
                singleBed,
                doubleBed,
                message,
                category: "apartments",
                userId: auth?.currentUser?.uid,
                createdData: getDate(),
              });
            }
          );
          // window.location.reload(false);
        }
      );
      // setLoading(false);
      toast.success("Successfully added!");
      // navigate("/");
      // window.location.reload(false);
    } catch (error) {
      // setLoading(false);
      toast.error(error.message);
      console.log(error.message);
    }
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
                      <label htmlFor="type"></label>
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
                      <label htmlFor="depocite"></label>
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
              {/* <div className={`relative ${img2 ? "inline" : "hidden"}`}>
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
              </div> */}
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
                      <option value="">Choose region</option>
                      <option value="tashkent city">Tashkent city</option>
                      <option value="tashkent region">Tashkent region</option>
                      <option value="andijan region">Andijan region</option>
                      <option value="bukhara region">Bukhara region</option>
                      <option value="jizzakh region">Jizzakh region</option>
                      <option value="karakalpakstan">Karakalpakstan</option>
                      <option value="kashkadarya">Kashkadarya region</option>
                      <option value="navoi region">Navoi region</option>
                      <option value="namangan region">Namangan region</option>
                      <option value="Samarkand region">Samarkand region</option>
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
                      <option value="">Choose city/dis</option>
                      <option value="tashkent">Tashkent</option>
                      <option value="yakkasaray">Yakkasaray</option>
                      <option value="mirabad">Mirabad</option>
                      <option value="sergely">Sergely</option>
                      <option value="mirzo-ulugbek">Mirzo-Ulugbek</option>
                      <option value="bekabad">Bekabad</option>
                      <option value="boston">Boston</option>
                      <option value="boka">Boka</option>
                      <option value="kibray">Kibray</option>
                      <option value="parkent">Parkent</option>
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
                  defaultValue={false}
                  checked={smoking === true}
                  onChange={() => setSmoking(true)}
                  className="mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="smoking">
                  Yes
                </label>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  defaultValue={false}
                  checked={smoking === false}
                  onChange={() => setSmoking(false)}
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
                  defaultValue={false}
                  checked={alcahol === true}
                  onChange={() => {
                    setAlcahol(true);
                  }}
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="alcohol">
                  Yes
                </label>
                <input
                  type="radio"
                  id="alcahol"
                  name="alcahol"
                  defaultValue={false}
                  checked={alcahol === false}
                  onChange={() => {
                    setAlcahol(false);
                  }}
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
                  defaultValue={false}
                  checked={pet === true}
                  onChange={() => setPet(true)}
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="pet">
                  Yes
                </label>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  defaultValue={false}
                  checked={pet === false}
                  onChange={() => setPet(false)}
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
                  defaultValue={false}
                  checked={family === true}
                  onChange={() => setFamily(true)}
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="family">
                  Yes
                </label>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  defaultValue={false}
                  checked={family === false}
                  onChange={() => setFamily(false)}
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
                  defaultValue={false}
                  checked={music === true}
                  onChange={() => setMusic(true)}
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="music">
                  Yes
                </label>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  defaultValue={false}
                  checked={music === false}
                  onChange={() => setMusic(false)}
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
                  defaultValue={false}
                  checked={party === true}
                  onChange={() => setParty(true)}
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="party">
                  Yes
                </label>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  defaultValue={false}
                  checked={party === false}
                  onChange={() => setParty(false)}
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
                          <option value="wi-fi">Wi-Fi internet</option>
                          <option value="ps4">Playstation 4 </option>
                          <option value="ps5">Playstation 5 </option>
                          <option value="ac">AC</option>
                          <option value="pool">Pool</option>
                          <option value="sauna">Sauna </option>
                          <option value="tennis">Table tennis </option>
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
