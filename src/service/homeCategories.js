import villasImg from "../assets/image/villas.jpg";
import villasIcon from "../assets/image/villas-icon.svg";
import apartmentsImg from "../assets/image/apartments.jpg";
import apartmentsIcon from "../assets/image/home-icon.b4f47182.svg";
import hotelsImg from "../assets/image/hotel.jpg";
import hotelsIcon from "../assets/image/hotel-icon.svg";
import resortsImg from "../assets/image/resort.jpg";
import resortsIcon from "../assets/image/resort-icon.svg";
import toursImg from "../assets/image/tour.jpg";
import tourIcon from "../assets/image/tour-icon.svg";
import extremeImg from "../assets/image/extreme.jpg";
import extremeIcon from "../assets/image/extreme-icon.svg";

export const homeCategories = [
  {
    id: "villas",
    title: "Villas",
    img: villasImg,
    bg: "bg-[#ff7e47]",
    icon: villasIcon,
    pathname: "/villas",
  },
  {
    id: "apartments",
    title: "Apartments",
    img: apartmentsImg,
    bg: "bg-[#426bbf]",
    icon: apartmentsIcon,
    pathname: "/apartments",
  },
  {
    id: "hotels",
    title: "Hotels",
    img: hotelsImg,
    bg: "bg-[#9847ff]",
    icon: hotelsIcon,
    pathname: "/hotels",
  },
  {
    id: "resorts",
    title: "Resorts",
    img: resortsImg,
    bg: "bg-[#ff5977]",
    icon: resortsIcon,
    pathname: "/resorts",
  },
  {
    id: "tours",
    title: "Tours",
    img: toursImg,
    bg: "bg-[#ffD159]",
    icon: tourIcon,
    pathname: "/tours",
  },
  {
    id: "extreme",
    title: "Ekstreme",
    img: extremeImg,
    bg: "bg-[#45d891]",
    icon: extremeIcon,
    pathname: "/extreme",
  },
];
