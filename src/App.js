import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AboutTeam from "./pages/AboutTeam";

import Departments from "./pages/Departments";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <AboutTeam />
            </Layout>
          }
        />

        <Route
          path="/about-team"
          element={
            <Layout>
              <AboutTeam />
            </Layout>
          }
        />

        <Route
          path="/departments"
          element={
            <Layout>
              <Departments />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;