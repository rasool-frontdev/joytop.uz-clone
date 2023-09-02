import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";
import { lazy } from "react";
const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Apartments = () => {
  const { t } = useTranslation();
  const { data: data, loading: loading } = useGetData("apartments");
  console.log(data);
  return (
    <>
      <Helmet title={t("Apartments")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle title="Villas" />
      <Cards data={data} />
    </>
  );
};

export default Apartments;
