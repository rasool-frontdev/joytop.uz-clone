import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Apartments = () => {
  const { t } = useTranslation();
  const { data: data } = useGetData("apartments");
  return (
    <div className="px-4 py-0 xl:px-0">
      <Suspense fallback={<Loader />}>
        <Helmet title={t("Apartments")} />
        <CategoryPages />
        <FilterCard />
        <CategoryTitle title="Villas" />
        <Cards data={data} />
      </Suspense>
    </div>
  );
};

export default Apartments;
