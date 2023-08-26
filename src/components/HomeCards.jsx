import { Link } from "react-router-dom";
import { homeCategories } from "../service/homeCategories";
import HomeCard from "./HomeCard";

const HomeCards = () => {
  return (
    <>
      {homeCategories.map((category) => (
        <HomeCard key={category.id} category={category} />
      ))}
    </>
  );
};

export default HomeCards;
