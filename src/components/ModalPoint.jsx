import { IoMdClose } from "react-icons/io";
import { homeCategories } from "../service/homeCategories";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToggle } from "../slice/addPoint";

const ModalPoint = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { toggle } = useSelector((state) => state.addPoint);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddPoint = (id) => {
    isLoggedIn ? navigate(`/add-point/${id}`) : navigate(`/login`);
    dispatch(setToggle());
  };

  return (
    <>
      {toggle && (
        <div className="fixed top-0 z-[99999] w-full h-[100%] backdrop-blur-sm">
          <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 shadow-[0px_0_50px_5px_#ccc] rounded-[10px]">
            <div className="bg-white rounded-lg px-[25px] py-[25px] h-auto">
              <div className="flex justify-end">
                <IoMdClose
                  size={25}
                  color="grey"
                  onClick={() => dispatch(setToggle())}
                  className="cursor-pointer"
                />
              </div>
              <h1 className="mb-8 text-[20px] text-lightGrey">
                What do yo want to add?
              </h1>
              <div className="grid justify-items-center gap-4 grid-cols-2">
                {homeCategories.map((category) => (
                  <button
                    className={`${category.bg} cursor-pointer hover:scale-110 ease-in duration-300 w-[186px] h-[100px] flex justify-center items-center rounded-lg`}
                    key={category.id}
                    onClick={() => handleAddPoint(category.id)}
                    type="button">
                    <div className="flex flex-col items-center gap-[14px]">
                      <img
                        src={category.icon}
                        alt="img"
                        className="w-[42px] h-[42px]"
                      />
                      <h6 className="text-white font-medium">
                        {category.nameUz}
                      </h6>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPoint;
