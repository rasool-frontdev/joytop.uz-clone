import { useParams } from "react-router-dom";

const CategoryTitle = (props) => {
  const category = useParams();
  console.log(category);
  return <h1>{props.title}</h1>;
};

export default CategoryTitle;
