import { lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetData } from "../hooks/useGetData";

const Helmet = lazy(() => import("../components/Helmet"));
const CategoryPages = lazy(() => import("../components/CategoryPages"));
const FilterCard = lazy(() => import("../components/FilterCard"));
const CategoryTitle = lazy(() => import("../components/CategoryTitle"));
const Cards = lazy(() => import("../components/Cards"));

const Resorts = () => {
  const { t, i18n } = useTranslation();
  // const [villas, setVillas] = useState([]);
  // const [apartments, setApartments] = useState([]);
  // const [hotels, setHotels] = useState([]);
  // const [resorts, setResorts] = useState([]);
  // const [tours, setTours] = useState([]);
  // const [extreme, setExtreme] = useState([]);

  // useEffect(() => {
  //   const filteredVillasCategory = allCategory.filter(
  //     (item) => item.category === "villas"
  //   );
  //   const filteredApartmentsCategory = allCategory.filter(
  //     (item) => item.category === "apartments"
  //   );
  //   const filteredHotelsCategory = allCategory.filter(
  //     (item) => item.category === "hotels"
  //   );
  //   const filteredResortsCategory = allCategory.filter(
  //     (item) => item.category === "resorts"
  //   );
  //   const filteredToursCategory = allCategory.filter(
  //     (item) => item.category === "tours"
  //   );
  //   const filteredExtremeCategory = allCategory.filter(
  //     (item) => item.category === "extreme"
  //   );
  //   setVillas(filteredVillasCategory);
  //   setApartments(filteredApartmentsCategory);
  //   setHotels(filteredHotelsCategory);
  //   setResorts(filteredResortsCategory);
  //   setTours(filteredToursCategory);
  //   setExtreme(filteredExtremeCategory);
  // }, [allCategory]);

  return (
    <div>
      <Helmet title={t("Resorts")} />
      <CategoryPages />
      <FilterCard />
      <CategoryTitle />
      <Cards />
      Resorts
    </div>
  );
};

export default Resorts;
