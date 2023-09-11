import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";
import Loader from "../components/Loader";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Extreme = () => {
  const { t, i18n } = useTranslation();
  const { data: data, loading: loading } = useGetData("extreme");

  return (
    <div className="px-4 py-0 xl:px-0">
      <Suspense fallback={<Loader />}>
        <Helmet title={t("Extreme")} />
        <CategoryPages />
        <FilterCard />
        <CategoryTitle title="Extreme" />
        <Cards data={data} />
      </Suspense>
    </div>
  );
};

export default Extreme;
