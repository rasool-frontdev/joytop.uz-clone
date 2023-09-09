import Card from "./Card";

const Cards = (data) => {
  return (
    <div className="w-full h-full grid justify-items-center xxs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.data?.map((item, i) => (
        <Card key={i} item={item} type="rent" />
      ))}
    </div>
  );
};

export default Cards;
