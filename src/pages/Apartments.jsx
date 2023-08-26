import { useTranslation } from "react-i18next";
import Helmet from "../components/Helmet";
import CategoryPages from "../components/CategoryPages";
import FilterCard from "../components/FilterCard";
import CategoryTitle from "../components/CategoryTitle";
import Card from "../components/Card";

const Apartments = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet title={t("Apartments")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle />
      <Card />
      <h1>Apartments</h1>
    </>
  );
};

export default Apartments;
