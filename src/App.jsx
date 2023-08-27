import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Villas = lazy(() => import("./pages/Villas"));
const Apartments = lazy(() => import("./pages/Apartments"));
const Hotels = lazy(() => import("./pages/Hotels"));
const Resorts = lazy(() => import("./pages/Resorts"));
const Tours = lazy(() => import("./pages/Tours"));
const Extreme = lazy(() => import("./pages/Extreme"));
const AddResorts = lazy(() => import("./pages/AddResorts"));
const AddVillas = lazy(() => import("./pages/AddVillas"));
const AddApartments = lazy(() => import("./pages/AddApartments"));
const AddHotels = lazy(() => import("./pages/AddHotels"));
const AddTours = lazy(() => import("./pages/AddTours"));
const AddExtreme = lazy(() => import("./pages/AddExtreme"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Layout />
            </Suspense>
          }>
          <Route index element={<Home />} />
          <Route path="/villas" element={<Villas />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/extreme" element={<Extreme />} />
          <Route path="/add-point/villas" element={<AddVillas />} />
          <Route path="/add-point/apartments" element={<AddApartments />} />
          <Route path="/add-point/hotels" element={<AddHotels />} />
          <Route path="/add-point/resorts" element={<AddResorts />} />
          <Route path="/add-point/tours" element={<AddTours />} />
          <Route path="/add-point/extreme" element={<AddExtreme />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
