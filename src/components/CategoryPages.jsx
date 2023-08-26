import { Link } from "react-router-dom";
import { homeCategories } from "../service/homeCategories";

const CategoryPages = () => {
  return (
    <div className="hidden md:block md:mt-[146px]">
      <div className="flex">
        {homeCategories.map((category) => (
          <Link
            className={`${category.bg} cursor-pointer hover:scale-110 ease-in duration-300 w-[228px] h-[130px] flex justify-center items-center`}
            key={category.id}
            to={`/${category.id}`}
            id={category.id}>
            <div className="flex flex-col items-center">
              <img src={category.icon} alt="img" className="w-[50px] h-full" />
              <h6 className="text-lightWhite">{category.nameUz}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPages;
