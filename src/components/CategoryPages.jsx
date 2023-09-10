import { Link, useLocation } from "react-router-dom";
import { homeCategories } from "../service/homeCategories";

const CategoryPages = () => {
  const location = useLocation();
  return (
    <div className="hidden xl:block">
      <div className="flex">
        {homeCategories.map((category) => (
          <div key={category.id}>
            {location.pathname !== category.pathname && (
              <div>
                <Link
                  className={`hover:scale-110 ease-in duration-100 cursor-pointer w-[228px] h-[130px] flex justify-center items-center hover:z-[99]`}
                  key={category.id}
                  to={`/${category.id}`}
                  id={category.id}>
                  <img
                    src={category.img}
                    alt="background image"
                    className="w-[228px] h-[130px] absolute object-cover hover:z-[-10] z-[-10]"
                  />
                  <div
                    className={`flex flex-col items-center ${category.bg} bg-opacity-60 w-[228px] h-[130px] p-2`}>
                    <img
                      src={category.icon}
                      alt="img"
                      className="w-[44px] h-[80px]"
                    />
                    <h6 className="text-white font-medium text-[22px]">
                      {category.title}
                    </h6>
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPages;
