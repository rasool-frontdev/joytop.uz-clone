import { lazy } from "react";
import { useTranslation } from "react-i18next";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Villas = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Helmet title={t("Apartments")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle />
      <Cards />
      Villas
    </div>
  );
};

export default Villas;
