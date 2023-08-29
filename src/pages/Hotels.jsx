import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Hotels = () => {
  const { data: data, loading: loading } = useGetData("hotels");
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Helmet title={t("Hotels")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle title="hotels" />
      <Cards data={data} />
    </div>
  );
};

export default Hotels;
