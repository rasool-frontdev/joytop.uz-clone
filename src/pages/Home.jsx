import { useTranslation } from "react-i18next";
import Helmet from "../components/Helmet";
import HomeCards from "../components/HomeCards";

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Helmet title={t("Main")} />
      <div className="gap-4 md:gap-8 px-4 lg:px-0 grid grid-cols-1 justify-items-center md:grid-cols-3 pb-10">
        <HomeCards />
      </div>
    </div>
  );
};

export default Home;
