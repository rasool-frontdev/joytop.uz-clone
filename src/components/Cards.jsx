import Card from "./Card";

const Cards = () => {
  return (
    <div className="w-full h-full grid justify-items-center xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card />
    </div>
  );
};

export default Cards;
