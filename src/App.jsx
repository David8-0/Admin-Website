import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Layout from "./components/Layout/layout";
// import ReviewsList from "./pages/ReviewsList/reviewslist";
import AppointmentList from "./pages/AppointmentList/appointmentlist";
import BuyerPage from "./pages/Buyers/buyers";
import AddBroker from "./pages/AddBroker/addbroker";
import AllBrokers from "./pages/AllBrokers/allbrokers";
import AddProperty from "./pages/AddProperty/addproperty";
import PropertyList from "./pages/PropertyList/propertylist";
import ForgotPassword from "./pages/ForgetPassword/forgetpassword";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Redirect root to login */}
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="reviews" element={<ReviewsList />} /> */}
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="buyer" element={<BuyerPage />} />
        <Route path="add-broker" element={<AddBroker />} />
        <Route path="view-brokers" element={<AllBrokers />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="view-property" element={<PropertyList />} />
      </Route>
    </Routes>
  );
}

export default App;
