import { IoBedOutline } from "react-icons/io5";
import { SiHomeassistant } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";

const Card = () => {
  return (
    <div className="xxs:w-[520px] sm:w-[345px] sm:h-[480px] md:w-full md:h-[480px] m-1 p-4 shadow-[-5px_0_10px_5px_#f4f4f4] rounded-md relative">
      <div className="text-[#575757] text-normal">
        <img
          src={img}
          alt="img"
          className="xxs:w-full xxs:h-[180px] sm:w-[352px] md:w-[100%] md:h-[160px] rounded-md mb-4 object-cover"
        />
        {/* <p>Sale</p> */}
        <div className="flex justify-between mb-4 text-[18px]">
          <h1 className="">{type}</h1>
          <p className="text-right">128</p>
        </div>
        <p className="text-[18px]">Name: {name}</p>
        <p className="text-[14px] my-2">Days: {daysPrice}-UZS</p>
        <p className="text-[14px]">Weekends: {weekendPrice}-UZS</p>

        <p className="flex items-center gap-2 mt-[10px] mb-[13px] text-[#ff7e47]">
          <SlLocationPin color="#ff7e47" />
          {location}
        </p>
        <div>
          <div className="flex gap-2 items-center">
            <IoBedOutline size={20} />
            {bed}
          </div>
          <div className="flex gap-2 items-center">
            <IoBedOutline size={20} /> {bigBed}
          </div>
        </div>
        {/* <div>
      <SiHomeassistant size={20} /> 10
      <p>{createdDate}</p>
    </div> */}
        <p className="absolute bottom-4 left-4 text-[12px]">{createdDate}</p>
      </div>
    </div>
  );
};

export default Card;
