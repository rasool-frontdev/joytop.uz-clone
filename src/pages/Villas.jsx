import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Villas = () => {
  const { t, i18n } = useTranslation();
  const { data: data, loading: loading } = useGetData("villas");
  console.log(data);
  return (
    <div>
      <Helmet title={t("Villas")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle title="Villas" />
      <Cards data={data} />
    </div>
  );
};

export default Villas;
