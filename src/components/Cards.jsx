import Card from "./Card";

const Cards = (data) => {
  return (
    <div className="w-full h-full grid justify-items-center xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {data?.data?.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
};

export default Cards;
