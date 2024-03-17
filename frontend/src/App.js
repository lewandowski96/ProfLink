import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneralProfileCreateForm from "./components/GeneralProfileCreateForm";
import Navbar from "./components/Navbar";
import CompanyListing from "./pages/CompanyListing";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompanyListing />} />
            <Route
              path="/general/create"
              element={<GeneralProfileCreateForm />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
