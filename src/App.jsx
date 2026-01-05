import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing3D from "./sections/Landing3D";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Contact from "./sections/Contact";

import Skills from "./sections/Skills";
import Projects from "./sections/Projects";


function App() {
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

export default App;
