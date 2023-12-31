import { lazy } from "react";
import { useTranslation } from "react-i18next";
const HomeCards = lazy(() => import("../components/HomeCards"));
const Helmet = lazy(() => import("../components/Helmet"));

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Helmet title={t("Main")} />
      <div className="gap-8 md:gap-8 px-4 lg:px-0 grid grid-cols-1 justify-items-center md:grid-cols-3 pb-10">
        <HomeCards />
      </div>
    </div>
  );
};

export default Home;
