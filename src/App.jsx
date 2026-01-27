import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing3D from "./sections/Landing3D";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Legal from "./sections/Legal";

import Skills from "./sections/Skills";
import Projects from "./sections/Projects";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import TestAPI from "./admin/TestAPI";

/**
 * Page d'accueil (site public)
 */
function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Hero />
        <Landing3D />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

/**
 * App avec routing
 */
function App() {
  const [adminUser, setAdminUser] = useState(null);

  // Vérifier si utilisateur est connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    if (token && user) {
      setAdminUser(JSON.parse(user));
    }
  }, []);

  function handleAdminLogout() {
    setAdminUser(null);
  }

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/legal" element={<Legal />} />

        {/* Test API (à supprimer en production) */}
        <Route path="/test-api" element={<TestAPI />} />

        {/* Routes admin */}
        <Route
          path="/admin"
          element={
            adminUser ? (
              <AdminDashboard user={adminUser} onLogout={handleAdminLogout} />
            ) : (
              <AdminLogin onLoginSuccess={setAdminUser} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
