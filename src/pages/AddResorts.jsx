import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import uploadImg from "../assets/uploadImg.png";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

// Initialization for ES Users

const AddResorts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formRef = useRef();
  const uuid = crypto.randomUUID();

  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}-${month}-${year}`;
  }

  function handleChangeImg(e) {
    // console.log(e.target.files);
    setImg1(URL?.createObjectURL(e?.target?.files[0]));
    // setImg2(URL?.createObjectURL(e?.target?.files[1]));
    // setImg3(URL?.createObjectURL(e?.target?.files[2]));
  }

  const handlerAddPoint = (e) => {
    e.preventDefault();
    // const image = formRef?.current[0]?.value;
    const image1 = formRef?.current[1]?.files[0];
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

    console.log(image1);

    if (image1 == null) return;

    try {
      const docRef = collection(db, "resorts");
      const storageRef = ref(storage, `resortImages/${uuid}`);
      const uploadTask = uploadBytesResumable(storageRef, image1);
      uploadTask.on(
        () => {
          toast.error("Image not uploaded");
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await addDoc(docRef, {
                id: uuid,
                image: downloadURL,
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
                category: "resorts",
                type: "Rent",
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
      navigate("/");
      // window.location.reload(false);
    } catch (error) {
      // setLoading(false);
      toast.error(error.message);
      console.log(error.message);
    }

    // try {
    //   const docRef = collection(db, "resorts");
    //   const storageRef = ref(storage, `resortsImages/${uuid}`);
    //   const uploadTask = uploadBytesResumable(storageRef, image1);
    //   uploadTask.on(
    //     () => {
    //       toast.error("Image not uploaded");
    //     },
    //     async () => {
    //       await getDownloadURL(uploadTask.snapshot.ref).then(
    //         async (downloadURL) => {
    //           await addDoc(docRef, {
    //             id: uuid,
    //             image: downloadURL,
    //             startingPrice,
    //             salePrice,
    //             region,
    //             city,
    //             videoLink,
    //             name,
    //             convenienc,
    //             smokingY,
    //             smokingN,
    //             alcaholY,
    //             alcaholN,
    //             petY,
    //             petN,
    //             onlyFamilyY,
    //             onlyFamilyN,
    //             musicY,
    //             musicN,
    //             partyN,
    //             partyY,
    //             phone,
    //             message,
    //             category: "resorts",
    //             type: "Rent",
    //             userId: auth?.currentUser?.uid,
    //             createdData: getDate(),
    //           });
    //           console.log("render 1");
    //         }
    //       );
    //       console.log("render 2");
    //     }
    //   );
    //   // setLoading(false);
    //   toast.success("Product created successfully");
    //   // navigate("/dashboard/all-products");
    // } catch (error) {
    //   // setLoading(false);
    //   console.log(error.message);
    //   toast.error(error.message);
    //   console.log("render error");
    // }
  };

  return (
    <div className="container">
      <div className="bg-[#F7F7FA] py-[2px] px-2 mb-4 w-10 h-10 flex items-center rounded-md">
        <BiArrowBack color="#575757" size={25} onClick={() => navigate(-1)} />
      </div>
      <h1 className="text-[#444] text-[32px] font-bold leading-[62px]">
        {t("Post an ad")}: Resorts
      </h1>
      <form ref={formRef} onSubmit={handlerAddPoint}>
        <div className="pt-12 grid grid-cols-2 gap-x-8">
          <div className="flex items-center justify-center">
            <label
              className="h-[300px] px-3 py-2 w-full border border-dashed rounded-md hover:border-[#426BFF] hover:bg-[#e5e5e5] border-[#e5e5e5] cursor-pointer flex flex-wrap"
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
                // accept="image"
                className="hidden"
                onChange={handleChangeImg}
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl text-[#444]">{t("Price")}</h1>
            <div className="grid grid-cols-2 gap-x-8 pt-2">
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
            </div>
            <h1 className="text-2xl text-[#444] mt-4">Address</h1>
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
          </div>
          {img1 && (
            <div className="flex items-center gap-4">
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
          <div>
            <h1 className="mt-4 mb-1 text-[#575757]">Add video</h1>
            <div className="rounded-md border border-[#e5e5e5] text-[#444]  h-11 flex hover:border-[#ff7e47]">
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
        </div>

        <div className="grid grid-cols-2 mt-8 gap-x-8">
          <div>
            <h1 className="text-2xl text-[#444] font-semibold">
              Main information
            </h1>
            <div className=" gap-x-8 pt-2">
              <div>
                <p className="text-[#575757] text-4">Name</p>
                <div className="flex justify-between items-center border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1 w-[268px]">
                  <input
                    type="text"
                    className="h-11 w-full pl-2 rounded-md outline-none text-[#575757] text-[14px] focus:border-[#ff7e47]"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-2xl text-[#444] mt-4">Conveniences</h1>
            <div className="gap-x-8 pt-2">
              <div>
                <p className="text-[#575757] text-4">Select conveniences</p>
                <div className="border hover:border-[#ff7e47] rounded-md border-[#e5e5e5] text-sm mt-1">
                  <div className="border-none  rounded-md text-[14px] text-[#575757] py-[7px] pl-[11px] outline-none ">
                    <label htmlFor="convenienc"></label>
                    <select className="w-full border-none outline-none">
                      <option value="">Wi-Fi internet</option>
                      <option value="">Playstation 4 </option>
                      <option value="">Playstation 5 </option>
                      <option value="">AC</option>
                      <option value="">Pool</option>
                      <option value="">Sauna </option>
                      <option value="">Table tennis </option>
                    </select>
                  </div>
                </div>
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
                  value="true"
                  className="mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="smoking">
                  Yes
                </label>
                <input
                  type="radio"
                  id="smoking"
                  name="smoking"
                  value="false"
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
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="alcohol">
                  Yes
                </label>
                <input
                  type="radio"
                  id="alcahol"
                  name="alcahol"
                  value="false"
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
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="pet">
                  Yes
                </label>
                <input
                  type="radio"
                  id="pet"
                  name="pet"
                  value="false"
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
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="family">
                  Yes
                </label>
                <input
                  type="radio"
                  id="family"
                  name="family"
                  value="false"
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
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="music">
                  Yes
                </label>
                <input
                  type="radio"
                  id="music"
                  name="music"
                  value="false"
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
                  value="true"
                  className="mr-1 mt-2 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="party">
                  Yes
                </label>
                <input
                  type="radio"
                  id="party"
                  name="party"
                  value="false"
                  className="ml-4 mr-1 hover:cursor-pointer"
                />
                <label className="text-[#575757]" htmlFor="part">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-[#444] font-semibold">
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

export default AddResorts;
