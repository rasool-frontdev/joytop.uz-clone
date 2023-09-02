import { Link } from "react-router-dom";

const HomeCard = ({ category }) => {
  return (
    <Link
      className="w-full h-[170px] xs:h-[190px] md:w-[220px] md:h-[200px] lg:w-[300px] lg:h-[250px] xl:w-[360px] xl:h-[320px] relative cursor-pointer hover:scale-105 ease-in duration-300"
      to={`/${category.id}`}>
      <div className="relative w-full h-[170px] xs:h-[190px] md:w-[220px] md:h-[200px] lg:w-[300px] lg:h-[250px] xl:w-[360px] xl:h-[320px] rounded-[10px]">
        <img
          src={category.img}
          alt="img"
          className="w-full h-full rounded-[10px] absolute object-cover "
        />
      </div>
      <div
        className={`${category?.bg} bg-opacity-60 rounded-[10px] w-full h-full z-10 absolute top-0`}></div>
      <h1 className="text-[#fff] w-full z-20 text-[24px] md:text-[30px] font-medium text-center absolute top-[80%]">
        {category.title}
      </h1>
      <div className="absolute border-none w-[60px] md:w-[90px] transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 z-[99]">
        <img src={category.icon} alt="img" />
      </div>
    </Link>
  );
};

export default HomeCard;
