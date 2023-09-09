import { useParams } from "react-router-dom";

const CategoryTitle = (props) => {
  return (
    <h1 className=" font-medium text-[26px] text-[#444444] mb-[25px]">
      {props.title}
    </h1>
  );
};

export default CategoryTitle;
