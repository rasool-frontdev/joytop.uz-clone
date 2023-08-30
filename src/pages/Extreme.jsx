import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Extreme = () => {
  const { t, i18n } = useTranslation();
  const { data: data, loading: loading } = useGetData("extreme");

  return (
    <div>
      <Helmet title={t("Extreme")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle title="Extreme" />
      <Cards data={data} />
    </div>
  );
};

export default Extreme;
