import { SlLocationPin } from "react-icons/sl";
import { AiFillStar } from "react-icons/ai";
import { useLocation } from "react-router-dom";
const Card = (item) => {
  const location = useLocation();
  return (
    <div className="max-w-[524px] w-full h-[488px] md:w-full md:h-[480px] m-1 p-4 shadow-[-5px_0_10px_5px_#f4f4f4] rounded-md relative">
      <div className="text-[#575757] text-normal">
        <img
          src={item?.item?.image}
          alt="img"
          className="max-w-[524px] w-full h-[180px] md:h-[160px] rounded-md mb-4 object-cover"
        />
        <div className="flex justify-between mb-4 text-[18px]">
          {location.pathname !== "/tours" && <h1 className="">Rent</h1>}
          <p className="text-right"># {item?.item?.id.slice(-3)}</p>
        </div>
        {location.pathname !== "/extreme" && (
          <p className="text-[18px]">
            Name:{" "}
            {item?.item?.name[0].toUpperCase() + item?.item?.name.slice(1)}
          </p>
        )}
        {location?.pathname !== "/hotels" &&
          location?.pathname !== "/tours" && (
            <p>
              Type:{" "}
              {item?.item?.type[0].toUpperCase() + item?.item?.type.slice(1)}
            </p>
          )}
        {location?.pathname === "/tours" && (
          <h4 className="text-[18px] font-medium">
            Country: {item?.item?.country}
          </h4>
        )}
        {item?.item?.start && (
          <p className="text-[18px] flex items-center">
            {item?.item?.start == "1" && (
              <div className="flex items-center text-[#ff7e47] gap-1">
                {item?.item?.start}
                <AiFillStar color="#ff7e47" />
              </div>
            )}
            {item?.item?.start == "2" && (
              <div className="flex items-center text-[#ff7e47] gap-1">
                {item?.item?.start}
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
              </div>
            )}
            {item?.item?.start == "3" && (
              <div className="flex items-center text-[#ff7e47] gap-1">
                {item?.item?.start}
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
              </div>
            )}
            {item?.item?.start == "4" && (
              <div className="flex items-center text-[#ff7e47] gap-1">
                {item?.item?.start}
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
              </div>
            )}
            {item?.item?.start == "5" && (
              <div className="flex items-center text-[#ff7e47] gap-1">
                {item?.item?.start}
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
                <AiFillStar color="#ff7e47" />
              </div>
            )}
          </p>
        )}
        {location.pathname !== "/tours" &&
          location.pathname !== "/extremes" && (
            <>
              <p className="text-[14px] my-2">
                Days:{" "}
                {item?.item?.salePrice !== "false"
                  ? item?.item?.salePrice
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                  : "not given"}
                UZS
              </p>
              <p className="text-[14px]">
                Weekends:{" "}
                {item?.item?.startingPrice
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                UZS
              </p>
            </>
          )}

        {location.pathname !== "/tours" && location.pathname !== "/extreme" && (
          <p className="flex items-center gap-2 mt-[10px] mb-[13px] text-[#ff7e47]">
            <SlLocationPin color="#ff7e47" />
            {item?.item?.region[0].toUpperCase() +
              item.item.region.slice(1)},{" "}
            {item?.item?.city[0].toUpperCase() + item.item.city.slice(1)}
          </p>
        )}
        <p className="absolute bottom-4 left-4 text-[12px]">
          {item?.item?.createdData}
        </p>
      </div>
    </div>
  );
};

export default Card;
