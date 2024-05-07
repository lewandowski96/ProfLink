import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BusinessProfileCreateForm from "./components/BusinessProfileCreateForm";
import CompanyProfileCreateForm from "./components/CompanyProfileCreateForm";
import ConsultantDashboard from "./components/ConsultantDashboard";
import ConsultantIndividualProfileCreateForm from "./components/ConsultantIndividualProfileCreateForm";
import ConsultantProfileCreateForm from "./components/ConsultantProfileCreateForm";
import ConsultantTeamProfileCreateForm from "./components/ConsultantTeamProfileCreateForm";
import CreateAd from "./components/CreateAd";
import GeneralProfileCreateForm from "./components/GeneralProfileCreateForm";
import Navbar from "./components/Navbar";
// import { useAuthContext } from "./hooks/useAuthContext";
import BusinessListing from "./pages/BusinessListing";
import BusinessProfile from "./pages/BusinessProfile";
import CandiShortList from "./pages/CandiShortList";
import ComAnalytics from "./pages/ComAnalytics";
import CompanyListing from "./pages/CompanyListing";
import CompanyProfile from "./pages/CompanyProfile";
import ConsultantListing from "./pages/ConsultantListing";
import ConsultantProfile from "./pages/ConsultantProfile";
import GeneralProfile from "./pages/GeneralProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MytestPage from "./pages/MytestPage";
import PostJob from "./pages/PostJob";
import Signup from "./pages/Signup";
import "./styles/form.css";
import "./styles/navbar.css";
import "./styles/profile.css";

// business
import BusinessAdvertisements from "./pages/business/advertisements/advertisements";
import BusinessAnalytics from "./pages/business/analytics/analytics";
import BusinessCreate from "./pages/business/create/create";
import BusinessCustomerTestimonials from "./pages/business/customerTestimonials/customerTestimonials";
import BusinessEdit from "./pages/business/edit/edit";
import BusinessOverview from "./pages/business/list/list";
import BusinessPage from "./pages/business/page/page";
import BusinessView from "./pages/business/view/view";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import GeneralProfileForm from "./components/GeneralProfileForm";
import RideShare from "./pages/RideShare";
import { setLogin } from "./store/reducers/auth.slice";
import { themeSettings } from "./theme";

function App() {
  // const { user } = useAuthContext();
  const user = useSelector((state) => state.user.user);
  const theme = useMemo(() => createTheme(themeSettings("light")), []);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserSession = JSON.parse(localStorage.getItem("user"));

    if (checkUserSession) {
      if (!user) {
        console.log("here");
        dispatch(setLogin(checkUserSession));
      }
    }

    //delay for loading user data
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [user]);

  console.log("user", user);

  if (user) {
    console.log("usernsaea");
  }

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed z-50 mb-4 h-screen w-full rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3">
          <div className="m-auto">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span className="block text-center font-mono text-lg font-semibold text-blue-500">
            {" "}
            Loading...{" "}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                element={
                  user ? <ConsultantListing /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/business/list"
                element={user ? <BusinessOverview /> : <Navigate to="/login" />}
              />
              <Route
                path="/business/analytics"
                element={
                  user ? <BusinessAnalytics /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/business/create"
                element={user ? <BusinessCreate /> : <Navigate to="/login" />}
              />
              <Route
                path="/business/edit/:id"
                element={user ? <BusinessEdit /> : <Navigate to="/login" />}
              />
              <Route
                path="/business/view/:id"
                element={user ? <BusinessView /> : <Navigate to="/login" />}
              />
              <Route
                path="/business/page/:id"
                element={user ? <BusinessPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/business/customer-testimonials/:id"
                element={
                  user ? (
                    <BusinessCustomerTestimonials />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/business/advertisements/:id"
                element={
                  user ? <BusinessAdvertisements /> : <Navigate to="/login" />
                }
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
                element={user ? <CompanyProfile /> : <Navigate to="/" />}
              />
              <Route
                path="/company/profile/postjob"
                element={user ? <PostJob /> : <Navigate to="/" />}
              />
              <Route
                path="/company/profile/Candidateshortlist"
                element={user ? <CandiShortList /> : <Navigate to="/" />}
              />
              <Route
                path="/company/profile/ComAnalytics"
                element={user ? <ComAnalytics /> : <Navigate to="/" />}
              />
              <Route
                path="/company/profile/mytest/test"
                element={<MytestPage />}
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
                    <ConsultantDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/consultant/createad"
                element={
                  user && user.userType === "CONSULTANT" ? (
                    <CreateAd />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/rideSharing"
                element={
                  user && user.userType === "GENERAL" ? (
                    <RideShare />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
