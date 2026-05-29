import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import AboutTeam from './pages/AboutTeam';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;