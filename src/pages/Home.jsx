import HomeCards from "../components/HomeCards";

const Home = () => {
  return (
    <div className="gap-4 md:gap-8 px-4 grid grid-cols-1 justify-items-center md:grid-cols-3 pb-10">
      <HomeCards />
    </div>
  );
};

export default Home;
