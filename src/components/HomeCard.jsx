import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";

const HomeCard = ({ category }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".home-card"), {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 5,
      scale: 1.1,
    });
  });
  return (
    <div className="home-card w-full h-[170px] xs:h-[190px] md:w-[220px] md:h-[200px] lg:w-[300px] lg:h-[250px] xl:w-[360px] xl:h-[320px] relative cursor-pointer">
      <Link className="" to={`/${category?.id}`}>
        <div
          data-tilt="true"
          className="w-full h-[170px] xs:h-[190px] md:w-[220px] md:h-[200px] lg:w-[300px] lg:h-[250px] xl:w-[360px] xl:h-[320px] rounded-[10px] ">
          <img
            src={category?.img}
            alt="img"
            className="w-full h-full rounded-[10px] absolute object-cover card-img "
          />
        </div>

        <div
          className={`${category?.bg} bg-opacity-60 rounded-[10px] w-full h-full z-10 absolute top-0`}></div>
        <h1 className="text-[#fff] w-full z-20 text-[24px] md:text-[30px] font-medium text-center absolute top-[130px] md:top-[150px] lg:top-[180px] xl:top-[240px]">
          {t(`${category?.title}`)}
        </h1>
        <div className="absolute border-none w-[60px] md:w-[90px] transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 z-[99]">
          <img
            src={category?.icon}
            alt="img"
            className="md:w-[80px] md:h-[80px] "
          />
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
