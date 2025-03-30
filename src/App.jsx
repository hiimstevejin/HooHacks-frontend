import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CountryList from "./components/Dashboard/CountryList";
import CityList from "./components/Dashboard/CityList";
import Form from "./components/Dashboard/Form";
import City from "./components/Dashboard/City";
import ProtectedRoute from "./components/ProtectedRoute";
import Recommendation from "./pages/RecommendationPage";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";

const googleLoginUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL;

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Router>
          <Routes>
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/"
              element={<Home googleLoginUrl={googleLoginUrl} />}
            ></Route>
            <Route
              path="/recommendation"
              element={
                <ProtectedRoute>
                  <Recommendation />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* <Route path="*" element={<PageNotFound />}></Route> */}
          </Routes>
        </Router>
      </CitiesProvider>
    </AuthProvider>
  );
}
