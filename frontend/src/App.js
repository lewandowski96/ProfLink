import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BusinessProfileCreateForm from "./components/BusinessProfileCreateForm";
import CompanyProfileCreateForm from "./components/CompanyProfileCreateForm";
import ConsultantIndividualProfileCreateForm from "./components/ConsultantIndividualProfileCreateForm";
import ConsultantProfileCreateForm from "./components/ConsultantProfileCreateForm";
import ConsultantTeamProfileCreateForm from "./components/ConsultantTeamProfileCreateForm";
import GeneralProfileCreateForm from "./components/GeneralProfileCreateForm";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import BusinessListing from "./pages/BusinessListing";
import BusinessProfile from "./pages/BusinessProfile";
import CompanyListing from "./pages/CompanyListing";
import CompanyProfile from "./pages/CompanyProfile";
import ConsultantListing from "./pages/ConsultantListing";
import ConsultantProfile from "./pages/ConsultantProfile";
import GeneralProfile from "./pages/GeneralProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './styles/navbar.css';
import './styles/profile.css';
import './styles/form.css';
import ConsultantDashboard from "./components/ConsultantDashboard";
import CreateAd from "./components/CreateAd";



function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/companies"
              element={user ? <CompanyListing /> : <Navigate to="/login" />}
            />
            <Route
              path="/consultants"
              element={user ? <ConsultantListing /> : <Navigate to="/login" />}
            />
            <Route
              path="/businesses"
              element={user ? <BusinessListing /> : <Navigate to="/login" />}
            />
            <Route
              path="/general/create"
              element={
                user && user.userType === "GENERAL" ? (
                  <GeneralProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/general/profile"
              element={
                user && user.userType === "GENERAL" ? (
                  <GeneralProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/business/create"
              element={
                user && user.userType === "BUSINESS" ? (
                  <BusinessProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/business/profile"
              element={
                user && user.userType === "BUSINESS" ? (
                  <BusinessProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/company/create"
              element={
                user && user.userType === "COMPANY" ? (
                  <CompanyProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/company/profile"
              element={
                user && user.userType === "COMPANY" ? (
                  <CompanyProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/create"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <ConsultantProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/individual/create"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <ConsultantIndividualProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/profile"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <ConsultantProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/team/create"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <ConsultantTeamProfileCreateForm />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/consultantdashboard"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <ConsultantDashboard/>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/consultant/createad"
              element={
                user && user.userType === "CONSULTANT" ? (
                  <CreateAd/>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
